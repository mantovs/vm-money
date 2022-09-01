import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";


export function TransactionsTable(){

    const {transactions} = useTransactions();

    return(

        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(e => {
                        return(
                            <tr key={e.id}>
                                <td>{e.title}</td>
                                <td className={e.type}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(e.amout)}
                                </td>
                                <td>{e.category}</td>
                                <td>{new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(e.createdAt))}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Container>
    );
}