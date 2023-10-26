import { Inter } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { ButtonComponent } from '@/components/button';
import { Check2Circle, EyeFill, PencilFill, Search, Trash, Trash2Fill, XCircleFill } from 'react-bootstrap-icons';
import { Message } from '@/components/toast';
import { getUsers } from '@/server/api/users/users';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] })
export default function UsersList() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [files, setInputFile] = useState<any | null>(null);
    const [dataOrigin, setUsersOrigin] = useState([]);
    const [data, setUsersFound] = useState([]);
    const columns = [
        {
            name: 'Name',

        },
        {
            name: 'Email',

        },
        {
            name: 'Enterprise',

        },
        {
            name: ' User Status',

        },
        {
            name: 'Subscription Status',

        },
        {
            name: 'Actions',

        },

    ];

    useEffect(() => {
        getUsers().then((resp) => {
            console.log(resp)
            if (resp.length > 0) {
                setUsersFound(resp);
                setUsersOrigin(resp);
            }
        })
    }, []);

    const onUpload = async () => {

    }

    const clearFile = () => {
        if (inputFileRef.current != null) {
            inputFileRef.current.value = "";
            setInputFile(null);
        }
    }

    const deleteProductFromTable = (id: number) => {

    }


    const onChange = (e: { target: { value: any } }) => {
        const keyword = e.target.value;
        if (keyword != "") {
            const results = data.filter((item) => {
                return item.email.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setUsersFound(results);
        } else {
            setUsersFound(dataOrigin);
        }
    }

    const handleClick = () => {
        if (inputFileRef.current != null) {
            inputFileRef.current.click();
        }
    }

    const onInputFileChange = (e: { target: { value: any } }) => {
        if (inputFileRef.current?.files) {
            if (inputFileRef.current.files[0]['type'] == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                setInputFile(inputFileRef.current.files[0]);
            } else {
                Message('Please use a file of .xlsx file', 500);
            }
        }
    }

    const fakeClick = () => {

    }


    return (
        <>
            <Container className="p-0">
                <Row>
                    <Col>
                        <InputGroup className="mb-2">
                            <InputGroup.Text id="basic-addon1"><Search></Search></InputGroup.Text>
                            <Form.Control
                                placeholder="Search"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={onChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Link href="/users/new">
                            <ButtonComponent content={'Add New User'} type={'primary'} action={fakeClick} css={'mb-2 mr-1'}></ButtonComponent>
                        </Link>
                        {
                            files == null ? <Button className="mb-2" onClick={handleClick}>Import Users</Button>
                                :
                                <Container className="mb-2 d-flex justify-content-end">
                                    <Row>
                                        <Col md={4} className='p-0'>
                                            <Container className='d-flex justify-content-end mt-2'>
                                                <span className=' mr-1'>{files.name} </span>
                                                <Link href={'#'} onClick={clearFile} className='mt-1'><Trash size={15} /></Link>
                                            </Container>

                                        </Col>
                                        <Col md={8} className='p-0'>
                                            <Container className='d-flex justify-content-end p-0'>
                                                <Button onClick={onUpload}>Upload File</Button>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Container>
                        }

                        <Form.Control type="file" className="d-none" ref={inputFileRef} onChange={onInputFileChange} />
                    </Col>
                </Row>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            {columns.map((column, index) => (
                                <th key={index}>{column.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((row, index) => (
                                <tr key={index}>
                                    <th scope="row">{row.id}</th>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.enterprise}</td>
                                    <td>{row.is_active ? <Check2Circle color='green'></Check2Circle> : <XCircleFill color='red'></XCircleFill>}</td>
                                    <td>{row.subscription.length > 0 ?
                                        row.subscription[0].is_active ? <Check2Circle color='green'></Check2Circle> : <XCircleFill color='red'></XCircleFill> : 'N/A'}</td>
                                    <td>
                                        <Link href={'/'}>
                                            <ButtonComponent content={<EyeFill></EyeFill>}
                                                type={'primary'} action={fakeClick} css={''}></ButtonComponent>
                                        </Link>
                                        <Link href={{ pathname: "/users/edit", query: { id: row.uuid } }}>
                                            <ButtonComponent content={<PencilFill></PencilFill>}
                                                type={'warning'} action={fakeClick} css={'ml-1'}></ButtonComponent>
                                            <ButtonComponent content={<Trash2Fill></Trash2Fill>}
                                                type={'danger'} action={fakeClick} css={'ml-1'}></ButtonComponent>
                                        </Link>
                                    </td>
                                </tr>

                            ))
                        }

                    </tbody>
                </Table>
            </Container >
        </>
    )
}