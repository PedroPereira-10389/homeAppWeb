import { ButtonComponent } from "@/components/button";
import { Message } from "@/components/toast";
import { getRoles } from "@/server/api/users/roles";
import { createUser } from "@/server/api/users/users";
import { checkForm } from "@/tools/forms/validations";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function AddUser() {
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        getRoles().then((resp) => {
            if (resp.length > 0) {
                setRoles(resp)
            }
        })
    }, [])

    const handleInput = (e: any) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value.trim();

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submit = (e: any) => {
        e.preventDefault()
        const canContinue = checkForm(formData, ['name', 'last_name', 'email', 'password', 'username', 'enterprise', 'roleId'])
        if (canContinue) {
            createUser(formData).then((resp) => {
                console.log(resp)
                //Message(resp.message, resp.status)
            })
        } else {
            Message('Please check all fields', 500);
        }
    }

    return (
        <Container className="p-0">
            <Form>
                <Row>
                    <Col >
                        <Form.Group className="mb-3" controlId="nameForm">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleInput} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="lastNameForm">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="last_name" onChange={handleInput} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="lastUsernameForm">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" defaultValue={formData.username} onChange={handleInput} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="emailForm">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleInput} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="passwordForm">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleInput} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="enterpriseForm">
                            <Form.Label>Enterprise</Form.Label>
                            <Form.Control type="text" name="enterprise" onChange={handleInput} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Select className="mt-3" aria-label="Select role" name="roleId" onChange={handleInput}>
                    <option>Select role</option>
                    {roles.map((item) => {
                        return (<option key={item.id} value={item.id}>{item.name}</option>)
                    })}
                </Form.Select>
                <ButtonComponent content={'Add'} type={'success'} action={submit} css={'mt-3'} ></ButtonComponent>
            </Form>
        </Container>
    );
}
