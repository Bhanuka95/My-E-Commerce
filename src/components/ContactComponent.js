import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Label, Input, Col, Row, } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, Form, Errors, actions} from 'react-redux-form';


//Since we need to store the state of the form in the state of our react component, we need to turn this component into a class component
//In a class, the return value should be enclosed in a render function

//form validation
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component{

    constructor(props){
        super(props);

          this.handleSubmit = this.handleSubmit.bind(this);

    }





    handleSubmit(values){
        this.props.postFeedback(values);
        this.props.resetFeedbackForm();
        
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Stock Address</h5>
                            <address>
                            119/4, Pethiyagoda,<br />
                            Gampaha, Western Province<br />
                            SRI LANKA<br />
                            <i className="fa fa-phone"></i>: +94702088649<br />
                            <i className="fa fa-fax"></i>: +94778269596<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:contact.sure@gmail.com">contact.sure@gmail.com</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send Us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                             <Row className="form-group"> {/*this row allows us to use bootstrap grid inside the form */}
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname" placeholder="First Name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                    <Errors className="text-danger" model=".firstname" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 charactors',
                                            maxLength: 'Must be less than 15 charactors'
                                            
                                        }}
                                        />

                                    
                                </Col> {/*Col is same as the div in bootstrap its getting a new row to the form */}
                                {/*onChange will reflect the change in the input value back to the state of our form there */}
                            </Row>
                            <Row className="form-group"> 
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname" placeholder="Last Name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors className="text-danger" model=".lastname" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 charactors',
                                            maxLength: 'Must be less than 15 charactors'
                                            
                                        }}
                                        />
                                    
                                </Col>
                            </Row>
                            <Row className="form-group"> 
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum" placeholder="Tel. Number" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                    <Errors className="text-danger" model=".telnum" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                            
                                        }}
                                    />
                                    
                                </Col>
                            </Row>
                            <Row className="form-group"> 
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email" placeholder="Email" className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                    />
                                    <Errors className="text-danger" model=".email" show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                            
                                        }}
                                    />
                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6, offset:2}}>{/*since we don't have a Label but still we can get margines*/}
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree" className="form-check-input"/> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col> 
                                <Col md={{size:3, offset:1}}>
                                    <Control.select model=".contactType" name="contactType" className="form-control" >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group"> 
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" rows="12" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export default Contact;