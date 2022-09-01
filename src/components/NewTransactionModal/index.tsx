import { Container, RadionBox, TransactionTypeContainer } from "./styles";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const {createTransaction} = useTransactions();

    const [title, setTitle] = useState('');
    const [amout, setAmout] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amout,
            category,
            type,
            createdAt: new Date()
        });

        setTitle('');
        setAmout(0);
        setCategory('');
        setType('deposit');
        onRequestClose();

    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar Modal"></img>
            </button>

            <Container 
                onSubmit={handleCreateNewTransaction}
            >

                <h2>Cadastrar Transação</h2>

                <input 
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amout}
                    onChange={event => setAmout(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadionBox
                        type="button"
                        onClick={() => {setType('deposit')}}
                        buttonType={type}
                        isActive={type === 'deposit'}
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadionBox>
                    <RadionBox
                        type="button"
                        onClick={() => {setType('withdraw')}}
                        buttonType={type}
                        isActive={type === 'withdraw'}
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saída</span>
                    </RadionBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}

                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>

        </Modal>
    );
}