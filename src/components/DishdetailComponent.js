import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Col, Breadcrumb, BreadcrumbItem, Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
 import {Loading} from './LoadingComponent';
 import {baseUrl} from '../shared/baseUrl';
 import {FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            
            isModalOpen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        return(
        <React.Fragment>
            <div>
                 <Button outline onClick={this.toggleModal}> 
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
            </div>

            <div className="col-12 col-md-9">
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                           
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}> 
                                    <Row className="form-group">
                                        <Col md={12}>
                                            <Label htmlFor="rating" >Rating</Label>                                     
                                            <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>                                        
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={12}>
                                            <Label htmlFor="yourname" >Your Name</Label>                                     
                                            <Control.text model=".yourname" id="yourname" name="yourname" className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                            />
                                            <Errors className="text-danger" model=".yourname" show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 charactors',
                                                    maxLength: 'Must be 15 charactors or less'
                                                    
                                                }}
                                            />
                                        </Col>                                        
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={12}>
                                            <Label htmlFor="comment" >Comment</Label>                                     
                                            <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6"/>
                                        </Col>                                        
                                    </Row>
 
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
        
                                </LocalForm>
                            </ModalBody>
                        </Modal>
            </div>
        </React.Fragment>
        )
    }

}

    

 function RenderComments({comments, postComment, dishId}){
       if(comments != null){
         
          var renderingComment = comments.map(function(comment, index){
            var date = new Date(comment.date);
            
            //var date = new Intl.DateTimeFormat('en-US',{year: 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse({comment.date)));
            
            
          return (
            <Stagger in> 
          <li key={index} > {comment.comment} {<br></br>} {"--"}{comment.author} {","} {date.toDateString()}</li>
          </Stagger>)
        });
            
            
           return(
            
                       <div className="col-12 col-md-5 m-1">
                       <Card>
                           <CardBody>
                               <CardTitle>Comments</CardTitle>
                               <CardText>
                                   
                                    <Fade in>
                                        <ul className="list-unstyled">{renderingComment }</ul>
                                        <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
                                    </Fade>
                               

                               </CardText>
                           </CardBody>
                       </Card>
                    </div>


           )
       }
   }


function RenderDish({dish}){//
        if(dish != null){
            return(
                        <div className="col-12 col-md-5 m-1">
                        <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%'}}>
                            <Card>
                                
                                <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>                   
                            
                            </Card>
                        </FadeTransform>
                        </div>
 
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }

    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if(props.dish != null){
        const PDish = props.dish;
        const cmt = props.comments;
     
  
         
         return(
             <div>
                 <div class="container">
                     <div className="row">
                         <Breadcrumb>
                             <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                             <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                             <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                         </Breadcrumb>
                         <div className="col-12">
                             <h3>{props.dish.name}</h3>
                             <hr></hr>
                         </div>                           
                             <RenderDish dish = {PDish}/>
                             <RenderComments comments = {cmt}
                                 postComment = {props.postComment}
                                 dishId = {props.dish.id}
                             />
                         
                     </div>
                 </div>
                 
              </div>
         );
    }
     
    }


export default DishDetail;

