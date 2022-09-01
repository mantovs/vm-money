import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function Summary(){

    const {transactions} = useTransactions();

    const totalDeposit = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit'){
            return acc + transaction.amout;
        }   

        return acc;
    },0);

    const totalWithDraw = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'withdraw'){
            return acc + transaction.amout;
        }   

        return acc;
    },0);

    const totalTotal = transactions.reduce((acc, transaction) => {

        if(transaction.type === 'deposit'){
            return acc + transaction.amout;
        }

        if(transaction.type === 'withdraw'){
            return acc - transaction.amout;
        }   

        return acc;
    },0);

    return(
        <Container>

            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(totalDeposit)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(totalWithDraw)}
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(totalTotal)}
                </strong>
            </div>
        </Container>
    );
}