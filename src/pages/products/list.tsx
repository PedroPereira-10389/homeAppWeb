import { ButtonComponent } from '@/components/button';
import { Message } from '@/components/toast';
import { deleteProduct, getProducts, importProducts } from '@/server/api/products/products';
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react'
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { EyeFill, PencilFill, Search, Trash, Trash2Fill } from 'react-bootstrap-icons';

const inter = Inter({ subsets: ['latin'] })

export default function ProductsList() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [files, setInputFile] = useState<any | null>(null);
    const [dataOrigin, setProductsFoundOrigin] = useState([]);
    const [data, setProductsFound] = useState([]);
    const columns = [
        {
            name: 'Reference',

        },
        {
            name: 'Price',

        },
        {
            name: 'Quantity',

        },
        {
            name: 'Actions',

        },
    ];

    useEffect(() => {
        getProducts().then((products) => {
            if (products.length > 0) {
                setProductsFound(products);
                setProductsFoundOrigin(products);
            }
        })
    }, [])


    const onChange = (e: { target: { value: any } }) => {
        const keyword = e.target.value;
        if (keyword != "") {
            const results = data.filter((item) => {
                return item.reference.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setProductsFound(results);
        } else {
            setProductsFound(dataOrigin);
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

    const onUpload = async () => {
        importProducts(files).then((resp) => {
            setProductsFoundOrigin(resp['message']['products'])
        }).catch((error) => {
            console.log(error);
            Message(error, 500);
        })
    }

    const clearFile = () => {
        if (inputFileRef.current != null) {
            inputFileRef.current.value = "";
            setInputFile(null);
        }
    }

    const deleteProductFromTable = (id: number) => {
        deleteProduct(id).then((resp) => {
            console.log(resp);
        });
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
                        {
                            files == null ? <Button className="mb-2" onClick={handleClick}>Import Products</Button>
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
                                    <td>{row.reference}</td>
                                    <td>{row.price}</td>
                                    <td>{row.quantity}</td>
                                    <td>
                                        <Link href={'/products/details/'+ row.id}>
                                            <ButtonComponent content={<EyeFill></EyeFill>}
                                                type={'primary'} action={''} css={''}></ButtonComponent>
                                        </Link>

                                        <ButtonComponent content={<PencilFill></PencilFill>}
                                            type={'warning'} action={() => deleteProductFromTable(row.id)} css={'ml-1'}></ButtonComponent>
                                        <ButtonComponent content={<Trash2Fill></Trash2Fill>}
                                            type={'danger'} action={deleteProductFromTable} css={'ml-1'}></ButtonComponent>

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