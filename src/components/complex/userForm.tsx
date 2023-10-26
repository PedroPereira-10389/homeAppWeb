import { ButtonComponent } from "@/components/button";
import { Message } from "@/components/toast";
import { getRoles } from "@/server/api/users/roles";
import { createorUpdateUser, getUserById } from "@/server/api/users/users";
import { checkForm, createUserName } from "@/tools/forms/validations";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useRouter } from 'next/navigation'
import { Loading } from "@/components/loading";
import { getSubscriptionsType } from "@/server/api/users/subscriptions";

const UserForm = ({ id }: { id: string }) => {
    const router = useRouter()
    const [roles, setRoles] = useState([]);
    const [subscriptionsType, setSubscriptionsType] = useState([]);
    const [formData, setFormData] = useState({});
    const [isLoading, setisloading] = useState(false);
    const [isToEdit, setIsToEdit] = useState(id != undefined || id != null ? true : false);

    useEffect(() => {
        if (isToEdit) {
            getUserById(id).then((resp) => {
                console.log(resp.subscription)
                setFormData(resp)
                setFormData((prevState) => ({
                    ...prevState,
                    'roleId': resp.role.id,
                    'subscriptionId': resp.subscription != undefined && 
                    resp.subscription.length > 0 ? resp.subscription[0].type.id : ''
                }));

            }).catch((error) => {
                console.log(error)
            })
            setIsToEdit(true)
        }

        getRoles().then((resp) => {
            if (resp.length > 0) {
                setRoles(resp)
            }
        }).catch((error) => {
            console.log(error)
        })

        getSubscriptionsType().then((resp) => {
            setSubscriptionsType(resp);
        })
    }, [])

    const handleInput = (e: any) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value.trim();
        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));

        if (!isToEdit) {
            const username = createUserName(formData);
            if (username != '') {
                setFormData((prevState) => ({
                    ...prevState,
                    'username': username
                }));
            }
        }
    }

    const handleUserName = (e: any) => {
        const fieldValue = e.target.value.trim();
        setFormData((prevState) => ({
            ...prevState,
            "username": fieldValue
        }));
    }

    const submit = (e: any) => {
        e.preventDefault()
        setisloading(true)
        const canContinue = checkForm(formData, !isToEdit ? ['name', 'last_name', 'email', 'password', 'username', 'enterprise', 'roleId', 'subscriptionId']
            : ['id', , 'uuid', 'name', 'last_name', 'email', 'username', 'enterprise', 'roleId', 'subscriptionId'])
        if (canContinue) {
            createorUpdateUser(formData).then((resp) => {
                Message(resp.message, resp.status);
                if (resp.status == 200) {
                    router.push("/users");
                }

            }).catch((error) => {
                Message(error, 500);
            })
        } else {
            Message('Please check all fields', 500);
        }
        setisloading(false)
    }

    return (
        <>
            <Container className="p-0">
                <Form>
                    <Row>
                        <Col >
                            <Form.Group className="mb-3" controlId="nameForm">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" defaultValue={formData.name} onChange={handleInput} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="lastNameForm">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="last_name" defaultValue={formData.last_name} onChange={handleInput} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="lastUsernameForm">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" defaultValue={formData.username} onChange={handleUserName} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="emailForm">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" defaultValue={formData.email} onChange={handleInput} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        {
                            !isToEdit ? <Col>
                                <Form.Group className="mb-3" controlId="passwordForm">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" onChange={handleInput} />
                                </Form.Group>
                            </Col> : <></>
                        }
                        <Col>
                            <Form.Group className="mb-3" controlId="enterpriseForm">
                                <Form.Label>Enterprise</Form.Label>
                                <Form.Control type="text" name="enterprise" defaultValue={formData.enterprise} onChange={handleInput} />
                            </Form.Group>
                        </Col>
                    </Row>
                    {

                    }
                    <Form.Select className="mt-3 mb-3" aria-label="Select role" value={formData.roleId != undefined ? formData.roleId : ''} name="roleId" onChange={handleInput}>
                        {
                            !isToEdit ? <option>Select role</option> : ''
                        }

                        {roles.map((item) => {
                            return (<option key={item.id} value={item.id}>{item.name}</option>)
                        })}
                    </Form.Select>
                    <Form.Select className="mt-4" aria-label="Select subscription" value={formData.subscriptionId != undefined ? formData.subscriptionId : ''} name="subscriptionId" onChange={handleInput}>
                        {
                            !isToEdit ? <option>Select subscription</option> : formData.subscriptionId == '' ? <option>Select subscription</option> : ''
                        }

                        {subscriptionsType.map((item) => {
                            return (<option key={item.id} value={item.id}>{item.name} ({item.price}€)</option>)
                        })}
                    </Form.Select>
                    <ButtonComponent content={'Save'} type={'success'} action={submit} css={'mt-3'} ></ButtonComponent>
                </Form>
            </Container>
            <Loading enabled={isLoading}></Loading>
        </>
    );

}

export default UserForm;