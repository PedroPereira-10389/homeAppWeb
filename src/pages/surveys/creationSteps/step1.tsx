import { ButtonComponent } from "@/components/button";
import AnimatedComponent from "@/components/complex/animated";
import { getBusinesses } from "@/server/api/businesses/businesses";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const Step1 = (props: any) => {
    const [businesses, setBusinesses] = useState([]);
    const { data, handleChange } = props

    useEffect(() => {
        getBusinesses().then((resp) => {
            setBusinesses(resp);
        })
    }, [])

    return (
        <Form>
            <Row>
                <div className="mb-3">
                    Thank you for choosing Seemly as your preference, let's start by presenting the best way forward, if the list below contains your business area, you can select to get a ready-made environment, or have it customized by you
                </div>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="nameForm">
                        <Form.Label>Business</Form.Label>
                        <Form.Select name="businessId" aria-label="Default select example" defaultValue={data.businessId} onChange={handleChange}>
                            <option>Select an option</option>
                            {
                                businesses.map((row, index) => {
                                    return (<option key={index} value={row.id}>{row.name}</option>)
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default Step1;