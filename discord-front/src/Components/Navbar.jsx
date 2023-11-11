import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FormCheck } from "react-bootstrap";
import { useState } from "react";

function SiteNavbar() {
    
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        console.log(theme);
        setTheme(theme == "light" ? "dark" : "light");
        setHtmlTheme();
    };


    const setHtmlTheme = () => {
        document.documentElement.setAttribute("data-bs-theme", theme);
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <div className="theme-container">
                <FormCheck // prettier-ignore
                    inline
                    onChange={toggleTheme}
                    type="switch"
                    label="Run"
                />
            </div>
            <Container>
                <Navbar.Brand href="#home">Discord Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Inicio</Nav.Link>
                        <Nav.Link href="#link">Bots</Nav.Link>
                        <NavDropdown title="Bots" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Register Bot</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Register Webhook</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Logs</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SiteNavbar;
