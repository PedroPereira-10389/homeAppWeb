import { signOut, useSession } from "next-auth/react";
import Avatar from "react-avatar";
import { BoxArrowInRight } from "react-bootstrap-icons";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarComponent = () => {
    const { data: session, status } = useSession();
    const logout = async (e: any) => {
        e.preventDefault();
        await signOut({ callbackUrl: '/' })
    }
    return (
        <>
            {session != undefined ? (
                <Navbar expand="md" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home">Home App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/homepage">Home</Nav.Link>
                                {
                                    session?.user.role.toLowerCase() == 'SuperAdmin'.toLowerCase() ? <Nav.Link href="/users">Users</Nav.Link> : <Nav.Link href="/surveys">Surveys</Nav.Link>
                                }

                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <a href="#login"><Avatar name="Foo Bar" size="30" className="mr-2" /> {session?.user.name}</a>
                            </Navbar.Text>
                            <Navbar.Text className="ml-2">
                                <a href="#logout" onClick={logout}><BoxArrowInRight /></a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            ) : <></>}

        </>)
}

export default NavbarComponent;