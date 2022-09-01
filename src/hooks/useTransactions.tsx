import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface ModelTransactions {
    id: string;
    title: string;
    amout: number;
    category: string;
    createdAt: Date;
    type: string;
}

// interface TrasactionInput {
//     title: string;
//     amout: number;
//     category: string;
//     type: string;   
// }

type TrasactionInput = Omit<ModelTransactions,'id'>;

interface TransactionsProviderProps {
    children: ReactNode
}

interface TrasactionsContextData {
    transactions: ModelTransactions[];
    createTransaction: (transactions:TrasactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TrasactionsContextData>(
    {} as TrasactionsContextData
);

export function TransactionsProvider({children}:TransactionsProviderProps){
    const [transactions, setTransactions] = useState<ModelTransactions[]>([])

    useEffect(() => {
        api.get('transactions')
        .then(
            (response) => {
                // console.log(response)
                setTransactions(response.data.transactions)
            }
            
            // response => setTransactions(response.data.transactions)
        );
    });

    async function createTransaction(transaction : TrasactionInput){

        await api.post('/transactions', transaction);

    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;

}