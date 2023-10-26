import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const Step2 = (props: any) => {
    const { data, handleChange } = props

    return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="nameForm">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" defaultValue={data.title} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="lastNameForm">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="last_name" defaultValue={data.description} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
    )
}

export default Step2;