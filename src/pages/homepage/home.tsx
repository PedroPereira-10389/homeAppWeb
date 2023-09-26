import { LoadingPage } from "@/components/loading";
import { Suspense } from "react";
import { Inter } from 'next/font/google'
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function HomeBody() {
    return (
        <Container>
            <Row>
                <Col>
                    <Link href={"/products"}>
                        <Container>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                            </Card>
                        </Container>
                    </Link>
                    <Link href={""}>
                        <Container className="mt-2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                            </Card>
                        </Container>
                    </Link>
                </Col>
                <Col>
                    <Link href={""}>
                        <Container>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                            </Card>
                        </Container>
                    </Link>
                    <Link href={""}>
                        <Container className="mt-2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                            </Card>
                        </Container>
                    </Link>
                </Col>
            </Row>
        </Container >
    )
}