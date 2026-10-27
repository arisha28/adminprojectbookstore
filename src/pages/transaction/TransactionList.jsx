import axios from "axios";
import { useEffect, useState } from "react"
import { Col, Container, Row, Table } from "react-bootstrap";
const apiUrl = import.meta.env.VITE_API_URL;

function TransactionList() {
    let [transactions, setTransactions] = useState([])
    useEffect(()=> {
        axios({
            url: apiUrl + '/transactions',
            method: 'get'
        }).then((res)=>{
            setTransactions(res.data.data)
        }).catch((err)=> {
            alert(err)
        })
    },[])
    return(
        <Container>
            <Row>
                <Col>
                    
                    <h3 className='text-center text-danger mt-5'>
                        Transaction List
                    </h3>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Email</th>
                                <th>Amount</th>
                                <th>Product</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions.map((transaction)=>
                                    <tr>
                                        <td>{transaction.transactionId}</td>
                                        <td>{transaction.email}</td>
                                        <td>&#x20b9;{transaction.amount}</td>
                                        <td>{transaction.products[0].bookTitle}</td>
                                        <td> <span className={`badge ${transaction.status === "completed"
                                            ? "bg-success"
                                            : "bg-danger"
                                    }`}
                                >
                                    {transaction.status}
                                </span></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
export default TransactionList