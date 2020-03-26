import React, { Component } from 'react';
//import React, { useState } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row,  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal, ModalHeader, ModalBody,ModalFooter,
  Form, FormGroup, Label, Card, CardBody, CardHeader,ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

  import API from '../../../API/api'
  import GoogleMap from '../../../components/GoogleMaps/index'
  import houseTestImage from "../../../assets/img/home1.jpg"
  import loadingGif from "../../../assets/img/cloud_load.gif"
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  toast.configure()

class Home extends Component {

  constructor(props) {
    super(props);

   this.setStateAsync = this.setStateAsync.bind(this);
   this.filterProperty = this.filterProperty.bind(this);
    this.logout = this.logout.bind(this)
    this.register = this.register.bind(this)
    this.viewMarkerInfo = this.viewMarkerInfo.bind(this);

   
    this.state = {
      
      isOpen: false,
      filteredArr : [],
      propertyArr : [],
      bedrooms: 0,
      minPrice: 0,
      maxPrice: 100000,
      squareFeet: 0,
      realtorLoggedIn: false,
      markerDetail : [],
      modal1 : false

      
    };

    this.handleClick = this.viewMarkerInfo.bind(this);


  }


  componentDidMount() {
    API.checkToken()
    .then(res => {
      console.log("authorized")
      if(localStorage.adminLoggedIn === "1x2x3x4x5" || localStorage.realtorLoggedIn === "2x8x3x4x5"){
        this.setState({realtorLoggedIn : true})
      }
      this.loadProperty()
    })
    .catch(err => {
      console.log(err)
      this.props.history.push('/login');

    });
  }

  toggle = () => {
    this.setState({modal1 : !this.state.modal1})
    //load stuff
  }

  // Loads all books and sets them to books
  loadProperty() {
    API.getPropertyAdmin()
      .then(res => {

        let activePropArr = []
        for(var i =0; i < res.data.length; i++){
          if(res.data[i].active){
            activePropArr.push(res.data[i])
          }
        }

        console.log(activePropArr)
        this.setState({propertyArr : activePropArr})
        this.setState({filteredArr : activePropArr})

        this.setState({isLoading : false})

       
      })
      .catch(err => {

        console.log(err)
        this.setState({isLoading : false})

      });
  };

  logout(e) {
  
      API.logout()
        .then(res => {
          localStorage.isLoggedIn = 0
          localStorage.adminLoggedIn = 0
          localStorage.user = ''
          localStorage.realtorLoggedIn = ''
          this.props.history.push('/login')
         
        })
        .catch(err => {
          if (err.response.status === 401) {
           // alert("Unauthorized user Please log back in!")
            toast("Invalid Username or password!", { autoClose: 3000 });
  
            this.props.history.push('/login');
           }  else{
            toast("Opps, can't connect to our servers!", { autoClose: 3000 });
  
           }  
    });
    }
    
  
  

  register(){
    console.log("hello")
    localStorage.isLoggedIn = 0
    localStorage.adminLoggedIn = 0
    localStorage.user = ''
    this.props.history.push('/register')

  }

  setStateAsync(state) {

    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async filterProperty(event){

  const { name, value } = event.target;
  //this.setState({[name] : value});
    //  await this.changeState(event)
      await this.setStateAsync({[name] : value});
      //this.setState({[name] : value});


      let filteredArr = []
      for(var i =0; i < this.state.propertyArr.length; i++){

console.log(this.state.squareFeet)
        if(this.state.propertyArr[i].active && this.state.propertyArr[i].num_of_rooms >= this.state.bedrooms && parseInt(this.state.propertyArr[i].floor_area_size) >= this.state.squareFeet && this.state.propertyArr[i].price >= this.state.minPrice && this.state.propertyArr[i].price <= this.state.maxPrice){
          filteredArr.push(this.state.propertyArr[i])
        }
      }

      this.setState({filteredArr : filteredArr})


  }


  viewMarkerInfo(result){

    this.setState({modal1 : !this.state.modal1, markerDetail : result})


  }
   

    render() {
    return (
      <div className="">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Toptal Reality</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          

          {this.state.realtorLoggedIn ? (
            <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/dashboard"  >Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.register }>Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.logout } >Logout</NavLink>
            </NavItem>
            </Nav>
          ) : (

            <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={this.register }>Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.logout } >Logout</NavLink>
          </NavItem>
          </Nav>
          )
          
          }
          
         
        </Collapse>
      </Navbar>
        <div style={{marginLeft:"20px", marginRight: "20px"}}>
{/*
          <Row className="justify-content-center" style={{marginTop:"50px"}}>
            <Col md="6">
              <div className="clearfix">
                <h1 style={{textAlign:"center"}}>Find your dream home</h1>
                <h4 style={{textAlign:"center"}} className="pt-3">We'll help you find a place you'll love.</h4>
                
              </div>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input size="16" type="text" placeholder="What are you looking for?" />
                <InputGroupAddon addonType="append">
                  <Button color="info">Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
*/}
    
        <Row>
          <Col md="12" className="smallerPadding">
            <Card style={{marginBottom:"5px"}}>
              
              <CardBody >
              <Row>
                    <Col md="3">
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Bedrooms</InputGroupText>
                          </InputGroupAddon>
                          <Input type="select" name="bedrooms" id="exampleSelect" onChange={this.filterProperty} defaultValue={this.state.bedrooms}>
                          <option value="1">Any</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                          <option value="5">5+</option>
                        </Input>
                      </InputGroup>
                    </Col>
                    <Col md="3">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Min Price</InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="minPrice" id="exampleSelect" onChange={this.filterProperty} defaultValue={this.state.minPrice}>
                      <option value = "0">Any (Per Month)</option>
                      <option value = "200">200</option>
                      <option value = "400">400</option>
                      <option value = "600">600</option>
                      <option value = "800">800</option>
                      <option value = "1000">1000</option>
                      <option value = "1200">1200</option>
                      <option value = "1400">1400</option>
                      <option value = "1600">1600</option>
                      <option value = "1800">1800</option>
                      <option value = "2000">2000</option>
                      <option value = "2200">2200</option>
                      <option value = "2400">2400+</option>
                    </Input>
                    </InputGroup>
                    </Col>
                    <Col md="3">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Max Price</InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="maxPrice" id="exampleSelect" onChange={this.filterProperty} defaultValue={this.state.maxPrice}>
                      <option value = "10000">Any (Per Month)</option>
                      <option value = "200">200</option>
                      <option value = "400">400</option>
                      <option value = "600">600</option>
                      <option value = "800">800</option>
                      <option value = "1000">1000</option>
                      <option value = "1200">1200</option>
                      <option value = "1400">1400</option>
                      <option value = "1600">1600</option>
                      <option value = "1800">1800</option>
                      <option value = "2000">2000</option>
                      <option value = "2200">2200</option>
                      <option value = "2400">2400+</option>
                    </Input>
                    </InputGroup>
                    
                      
                    </Col>

                    <Col md="3">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Square Ft.</InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="squareFeet" id="exampleSelect" onChange={this.filterProperty} defaultValue={this.state.squareFeet}>
                      <option value ="0">Any</option>
                      <option value ="500">500+</option>
                      <option value ="1000">1000+</option>
                      <option value ="1500">1500+</option>
                      <option value ="2000">2000+</option>
                      <option value ="2500">2500+</option>
                      <option value ="3000">3000+</option>
                      <option value ="3500">3500+</option>
                    </Input>
                    </InputGroup>
                    
                      
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>

          
         
          <Col md="4" className="smallerPadding" style={{height : "auto", minHeight:"400px"}}>
          
          

          <Card style={{height: "100%", width: "100%"}}>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>List View</strong>
              <small> click on items to view apartments in detail</small>
            </CardHeader>
            <CardBody style={{padding:"0px"}}>

            <ListGroup style={{minHeight: "600px",maxHeight: "700px",height: "100%", width: "100%", overflowY: "auto"}}>

                {

                  this.state.filteredArr.length == 0 ? (
                    //Loading
                    
                      <ListGroupItem className="smallerPadding">
                      <Card  style={{textAlign: "center", marginBottom: "0px"}} >
                          <CardBody>
                          Opps! No data meets this filter
                      
                          </CardBody>
                          </Card>
                      </ListGroupItem>
                      
            
                  ) : (
                  this.state.filteredArr.map((property, index) =>
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
                  markerArray={this.state.filteredArr}
                  getMarker={this.viewMarkerInfo}
                />
              </CardBody>
            </Card>
          </Col>
          </Row>
          </div>

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

export default Home;
