import { Inter } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { ButtonComponent } from '@/components/button';
import { Check2Circle, EyeFill, PencilFill, Search, Trash, Trash2Fill, XCircleFill } from 'react-bootstrap-icons';
import { getSurveysByUser } from '@/server/api/surveys/surveys';
import { useSession } from 'next-auth/react';
import TableComponent from '@/components/table';
import { LoadingPage } from '@/components/loading';

export default function SurveysList() {
    const { data: session, status } = useSession();
    const [dataOrigin, setSurveysOrigin] = useState([]);
    const [data, setSurveysFound] = useState([]);
    const columns = [
        {
            name: 'Title',

        },
        {
            name: 'Questions Count',

        },
        {
            name: 'Template',

        },
        {
            name: 'Created At',

        },
        {
            name: 'Updated At',

        },
        {
            name: 'Actions',

        },

    ];

    useEffect(() => {
        if (status != 'loading') {
            getSurveysByUser(session.id).then((resp) => {
                setSurveysOrigin(resp)
                setSurveysFound(resp)
            });
        }

    }, [session]);

    const onChange = (e: { target: { value: any } }) => {
        const keyword = e.target.value;
        if (keyword != "") {
            const results = data.filter((item) => {
                return item.email.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setSurveysFound(results);
        } else {
            setSurveysFound(dataOrigin);
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
                                aria-label="Survey"
                                aria-describedby="basic-addon1"
                                onChange={onChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Link href="/surveys/new">
                            <ButtonComponent content={'Add New Survey'} type={'primary'} action={fakeClick} css={'mb-2 mr-1'}></ButtonComponent>
                        </Link>
                    </Col>
                </Row>
                <TableComponent data={data} columns={columns}
                    onClickView={fakeClick}
                    onClickEdit={fakeClick}
                    onClicDelete={fakeClick}
                    LinkView={'/'}
                    LinkEdit={'/users/edit'}
                />
            </Container ></>)
}