import React, { Component, lazy, Suspense } from 'react';
import { Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Card, CardBody, Collapse, CardHeader, CardFooter, Col, Row, Table,Button,Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap';


import { Link } from 'react-router-dom';

import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4geodata_region_usa_caLow from "@amcharts/amcharts4-geodata/region/usa/caLow";
import { NavLink } from 'react-router-dom';
import loadingGif from "../../assets/img/cloud_load.gif"
import YouTube from 'react-youtube';
import API from '../../API/api'
import PhotoSlider from "./Carousel"
import houseTestImage from "../../assets/img/home1.jpg"
import GoogleMap from "../../components/GoogleMaps/index"
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  toast.configure()




class Dashboard extends Component {
  constructor(props) {
    super(props);

     this.viewMarkerInfo = this.viewMarkerInfo.bind(this);
    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);


    this.state = {
      
      isLoading: false,
      collapse: false,
      accordion: [],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      classData: [],
      modal1: false,
      userData: [],
      isLoggedIn: false,
      markerArray : [{id: 12342, lat: 39.09814, lng: -94.62191},{id: 4324324, lat: 38.89814, lng: -94.42191}],
      propertyArr: [],
      markerDetail : []

    };
  }

 


  componentDidMount() {

    

    API.checkToken()
    .then(res => {
      //console.log("authorized")
      if(localStorage.adminLoggedIn === "1x2x3x4x5"){
      this.loadPropertyAdmin();
      }else if(localStorage.realtorLoggedIn === "2x8x3x4x5"){
        this.loadProperty();
      }else{
        this.props.history.push('/404');

      }
      
    })
    .catch(err => {
      //console.log(err)
      this.props.history.push('/login');

    });
  }

  toggle = () => {
    this.setState({modal1 : !this.state.modal1})
    //load stuff
  }


  loadPropertyAdmin() {
    API.getPropertyAdmin()
      .then(res => {

        let activePropArr = []
        for(var i =0; i < res.data.length; i++){
          if(res.data[i].active){
            activePropArr.push(res.data[i])
          }
        }

        //console.log(activePropArr)
        this.setState({propertyArr : activePropArr})
        this.setState({isLoading : false})

       
      })
      .catch(err => {

        //console.log(err)
        this.setState({isLoading : false})

      });
  };


  loadProperty() {
    API.getPropertyRealtor()
      .then(res => {

        let activePropArr = []
        for(var i =0; i < res.data.length; i++){
          if(res.data[i].active){
            activePropArr.push(res.data[i])
          }
        }

        //console.log(activePropArr)
        this.setState({propertyArr : activePropArr})
        this.setState({isLoading : false})

       
      })
      .catch(err => {

        //console.log(err)
        this.setState({isLoading : false})

      });
  };

   // Loads all books and sets them to books
   loadUser() {
    API.getUser(this.props.match.params.id)
      .then(res => {

        this.setState({userData : res.data})
        //console.log(this.state.userData)
        
      })
      .catch(err => {
        if (err.response.status === 401) {
         // alert("Unauthorized user Please log back in!")
          toast("Invalid Username or password!", { autoClose: 3000 });

          this.props.history.push('/login');
         }  else{
          toast("Opps, can't connect to our servers!", { autoClose: 3000 });

         }  
      })
    };

    viewMarkerInfo(result){

     // alert(markerID)
     this.setState({modal1 : !this.state.modal1, markerDetail : result})
      //console.log(this)
  
    }


  

  render() {

    const opts = {
      height: '400',
      width: '100%',
      playerVars: { 
        autoplay: 0
      }
    };

    return (
      <div className="animated fadeIn" style={{height:"90%", paddingLeft: "15px", paddingRight: "15px"}}>

      {this.state.isLoading ? (
        //Loading
        <Row>
          <div>
            <h1>
              LOADING!
            </h1>
            <img src={loadingGif} />

          </div>
        </Row>

      ) : (

        
      <div style={{height:"100%"}}>

          <Row style={{height:"100%"}}> 
            <Col md="4" className="smallerPadding">

            <Card style={{height: "100%", width: "100%"}}>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List View</strong>
                <small> click on items to view apartments in detail</small>
              </CardHeader>
              <CardBody style={{padding:"0px"}}>

              <ListGroup style={{maxHeight: "700px",height: "100%", width: "100%", overflowY: "auto"}}>

              {
                this.state.propertyArr.map((property, index) =>
                  <ListGroupItem key={index} className="smallerPadding" onClick={() => this.viewMarkerInfo(property)}>
                  <Card  style={{textAlign: "center", marginBottom: "0px"}} >
                      

                      <CardBody>
                        <Row>
                        <Col md="4" className="smallerPadding">
                        <img src={houseTestImage} className="card-img-top" height= "125" style={{maxWidth:"150px", marginLeft:"auto", marginRight: "auto"}} alt="..." />
                        </Col>
                        <Col md="8" className="smallerPadding">
                        <h5>{property.name}</h5>
                        <a  className="card-link"><b>Rooms: </b>{property.num_of_rooms}</a>
                        <a  className="card-link"><b>Price:</b>{property.price}</a>
                        <a  className="card-link"><b>Sqft:</b>{property.floor_area_size}</a>
                        
                        <p>{property.description}</p>
                        Brokered By : {property.realtor.firstname + " "+ property.realtor.lastname}
                        </Col>
                        </Row>
                       
                      </CardBody>
                    </Card>
                  </ListGroupItem>
                    
                  
                )
              }
                
               
              </ListGroup>
              </CardBody>
            </Card>
              

              
              
            </Col>
            <Col md="8" className="smallerPadding" style={{height : "auto", minHeight:"400px"}}>
              <Card style={{height : "100%"}}>
                <CardHeader>
                  <i className="fa fa-align-justify"></i><strong>Map View</strong>
                  <small> click markers to view apartments in detail</small>
                </CardHeader>
                <CardBody style={{padding : "0"}}>
                    <GoogleMap
                    isMarkerShown 
                    markerArray={this.state.propertyArr}
                    getMarker={this.viewMarkerInfo}
                  />
                </CardBody>
              </Card>
            </Col>
            
            

          
          </Row>

         
        
        </div>
        
      )}




      <Modal className="modal-lg" isOpen={this.state.modal1} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Create New Class</ModalHeader>
          <ModalBody>
            <Form>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="exampleEmail">Name</Label>
                  <Input name="name" defaultValue={this.state.markerDetail.name} disabled/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Apartment Square Feet</Label>
                  <Input disabled  name="floor_area_size" defaultValue={this.state.markerDetail.floor_area_size} />
                </FormGroup>
              
              </Col>
              <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">Price</Label>
                <Input  name="price" defaultValue={this.state.markerDetail.price} disabled/>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Number Of Rooms</Label>
                <Input  name="num_of_rooms" disabled defaultValue={this.state.markerDetail.num_of_rooms} />
              </FormGroup>
              </Col>
            </Row>

           
            <hr></hr>

            <FormGroup>
            <Label for="exampleEmail">Address </Label>
            <Input placeholder="FULL MAILING ADDRESS: 13634 w129th place, Olathe, KS 666062" disabled onChange={this.handleOnChange} name="address" defaultValue={this.state.markerDetail.address}/>
           </FormGroup>

           <br></br>
            
            <Row>
              
              <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">Latitude</Label>
                <Input  name="lat" defaultValue={this.state.markerDetail.lat} disabled/>
              </FormGroup>
              <FormGroup>
                  <Label for="exampleEmail">Longitude</Label>
                  <Input  name="lng" defaultValue={this.state.markerDetail.lng} disabled/>
                </FormGroup>
              </Col>
            </Row>
                    
           
            <hr></hr>

             

              <FormGroup row>
                <Label for="exampleText" sm={2}>Description</Label>
                <Col sm={10}>
                  <Input type="textarea" name="description" id="" defaultValue={this.state.markerDetail.description} disabled/>
                </Col>
              </FormGroup>
            
            
            
            </Form>
           </ModalBody>
          <ModalFooter>
            <Button className="button-shamana" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>

       </div>
    );
  }

 
}

export default Dashboard;

