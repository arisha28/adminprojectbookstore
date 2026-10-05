import axios from "axios";
import { useEffect, useState } from "react";
import {  Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
const apiUrl = import.meta.env.VITE_API_URL

function DiscountList() {
    let [discounts, setDiscounts] = useState([])
    let navigate = useNavigate();
    function goToAddDiscount() {
    navigate('/add/discount')
}
function getBookForEdit(id) {
    navigate('/edit/discount/' + id)
}
    useEffect(()=>{
        axios({
            url: apiUrl + '/discounts',
            method: 'get'
        }).then((res)=>{
            setDiscounts(res.data.data)
        }).catch((err)=> {
            alert(err)
        })
    },[])
    return(
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="type book name to search"></Form.Control>
                        </Form.Group>
                    </Form>
                    <Button className="mt-5" variant="success" style={{ float: "right"}} onClick={goToAddDiscount}>Add Discount +</Button>
                </Col>
            </Row>
            <Row>
                <h3 className="text-danger text-center mt-2"> Discounts List </h3>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Discount Name</th>
                            <th>Discount Type</th>
                            <th>Discount Value</th>
                            <th>Book Title</th>
                            <th>Valid from</th>
                            <th>Valid to</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discounts.map((discount)=> 
                            <tr>
                                <td>{discount.discountName}</td>
                                <td>{discount.discountType}</td>
                                <td>{discount.discountValue}</td>
                                {/* <td>{discount.book.bookTitle}</td> */}
                                <td>{new Date(discount.validFrom).toLocaleDateString("en-GB")}</td>
                                <td>{new Date(discount.validTo).toLocaleDateString("en-GB")}</td>
                                
                                <td>
                                    <span
                                        className={`badge rounded-pill ${
                                            discount.status === 'Active' ? 'bg-success' : 'bg-danger'
                                        }`}
                                    >
                                        {discount.status}
                                    </span>
                                </td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={()=> {getBookForEdit(discount._id)}} >Edit</Button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default DiscountList