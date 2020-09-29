import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Col, Breadcrumb, BreadcrumbItem, Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

function RenderImage({occasion}){
     return(
         <Card>
             <CardImg src={occasion.image} alt={occasion.name}/>
             <CardBody>
                <CardTitle>{occasion.name}</CardTitle>
                <CardText>{occasion.description}</CardText>
             </CardBody>
         </Card>
     );
}

function Gallery(props){
    const gallery = props.gallery.map((item) => {
        return (
            <div key={item.id} className="col-12 col-md-5 m-1">
                <RenderImage occasion={item} />
            </div>
        );
    });
     return(
         <div className="container">
             <div className="col-12">
                <h4>Gallery</h4>
             </div>
             <div className="row">
                 {gallery}
             </div>
             
         </div>

     )
}

 export default Gallery;