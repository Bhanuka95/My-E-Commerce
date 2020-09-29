//we add a header and a footer component so those can be shared among each component
import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
        // make the toggle nav function available to the jsx code   
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event){
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value + "Remember: " + this.remember.checked);
        event.preventDefault();
    }

    render(){
        return(
            <React.Fragment>
                 <Navbar dark expand="md"> {/*for medium to extra large, nav bar will be shown in its full size */}
                <div className="container">
                     <NavbarToggler onClick={this.toggleNav}/> {/*This is a button and this will be available for small and extra small page sizes, when we click This
                                                                the nav items will be shown */}
                    <NavbarBrand className="mr-auto" href="/"><img src="assets/images/logo.png" height="60" width="90"
                        alt="Sure.lk"/>
                        </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-Link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-Link" to="/aboutus">
                                <span className="fa fa-info fa-lg"></span> About Us
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-Link" to="/menu">
                                <span className="fa fa-list fa-lg"></span> menu
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-Link" to="/contactus">
                                <span className="fa fa-address-card fa-lg"></span> Contact Us
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-Link" to="/gallery">
                                <span className="fa fa-camera-retro fa-lg"></span> Gallery
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-sign-in fa-lg"></span>Login
                            </Button>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Sure.lk</h1>
                                <p>The Best Online Store to Fulfil Your Mobile Needs! You can find directly imported mobile phones and accessories for a reasonable price</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                   
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}> 
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={(input) => this.password = input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input}></Input>Remember me
                                    
                                </Label>
                            </FormGroup> 
                            <Button type="submit" value="submit" className=".bg-primary">Login</Button>

                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>

        );
    }
}

export default Header;