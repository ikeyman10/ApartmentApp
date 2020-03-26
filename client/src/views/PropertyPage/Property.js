import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,FormGroup, Label, Input,FormFeedback,FormText, Form, Modal, ModalHeader, ModalBody,ModalFooter,Button, CardFooter } from 'reactstrap';
import API from '../../API/api'
import confirm from "reactstrap-confirm";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()



class User extends Component {

  constructor(props) {
    super(props);

    this.getGPS = this.getGPS.bind(this);


    this.state = {
      
      propertyData : {},
      name: '',
      price: '',
      floor_area_size: '',
      num_of_rooms: '',
      description: '',
      address: '',
      lat: '',
      lng: '',
      active: true,
      modal: false,
      modalEdit: false,
   

    }
  }

  componentDidMount(){

    API.checkToken()
    .then(res => {
      //console.log("authorized")
      if(localStorage.adminLoggedIn === "1x2x3x4x5" || localStorage.realtorLoggedIn === "2x8x3x4x5"){
        this.loadProperty();
      }else{
        this.props.history.push('/404');

      }
     
    })
    .catch(err => {
      if (err.response.status === 401) {
        alert("Unauthorized user Please log back in!")
        this.props.history.push('/login');
       }  else{
        alert("We are having some server issues, try again later!")
       }      
      });
    

  }

  toggle = () => this.setState({modal : !this.state.modal});


  toggleEdit = (videoID, videoname, videoURL) => {
    this.setState({modalEdit : !this.state.modalEdit, videoIDedit:videoID , videoNameEdit: videoname, videoURLEdit: videoURL});


  }



  handleOnChange = (event) =>{

    const { name, value } = event.target;

    
    this.setState({[name] : value});
   // //console.log(name+":"+value)

    this.setState(prevState => ({
      propertyData: {                   // object that we want to update
          ...prevState.propertyData,    // keep all other key-value pairs
          [name] : value    // update the value of specific key
      }
    }
    
    ))
   // //console.log(this.state.propertyData)

  }

  handleGPSChange = (name, value) =>{

    //const { name, value } = event.target;

    
    this.setState({[name] : value});
   // //console.log(name+":"+value)

    this.setState(prevState => ({
      propertyData: {                   // object that we want to update
          ...prevState.propertyData,    // keep all other key-value pairs
          [name] : value    // update the value of specific key
      }
    }
    
    ))
   // //console.log(this.state.propertyData)

  }


  // Loads all books and sets them to books
  loadProperty() {
    API.getPropertyById(this.props.match.params.id)
      .then(res => {

        this.setState({propertyData : res.data})
       
       
        
      })
      .catch(err => {
        if (err.response.status === 401) {
          alert("Unauthorized user Please log back in!")
          this.props.history.push('/login');
         }  else{
          alert("We are having some server issues, try again later!")
         }      
        });
  };

  getGPS() {

    if(this.state.propertyData.address == ''){
      alert("please fill out entire address!")
      return false;
    }
  
    API.getCoordinates(this.state.propertyData.address)
      .then(res => {

        //console.log(res.data.results[0].geometry.location.lat)
        //console.log(res.data.results[0].geometry.location.lng)
        //console.log(res.data.results[0].formatted_address)
        toast("Successfully updated geocoordinates based on the address given!", { autoClose: 3000 });

        this.handleGPSChange("lat", res.data.results[0].geometry.location.lat)
        this.handleGPSChange("lng", res.data.results[0].geometry.location.lng)
        this.handleGPSChange("address", res.data.results[0].formatted_address)

        //this.setState({lat : res.data.results[0].geometry.location.lat, lng : res.data.results[0].geometry.location.lng, address : res.data.results[0].formatted_address})
        // this.setState({isLoading : false})

      })
      .catch(err => {
        if (err.response.status === 401) {
          toast("Unauthorized user Please log back in!", { autoClose: 3000 });

          this.props.history.push('/login');
         }  else{
          alert("We are having trouble connecting to google api, try again later or manually type in your lat and lng coordinates!")
         }      
        });
  };


  handlesubmit = () => {

    //console.log(this.state.propertyData)
  //console.log(formObj);
  if(isNaN(this.state.propertyData.lat)){
    toast("Latitude must be a number only!", { autoClose: 3000 });
    return false;
  }else if(isNaN(this.state.propertyData.lng)){
    toast("Longitude must be a number only!", { autoClose: 3000 });
    return false;
  }else if(isNaN(this.state.propertyData.price)){
    toast("Price must be a number only!", { autoClose: 3000 });
    return false;
  }else if(isNaN(this.state.propertyData.num_of_rooms)){
    toast("Number Of Rooms must be a number only!", { autoClose: 3000 });
    return false;
  }else if(!this.state.propertyData.name || !this.state.propertyData.floor_area_size || !this.state.propertyData.num_of_rooms || !this.state.propertyData.description || !this.state.propertyData.address || !this.state.propertyData.lat || !this.state.propertyData.lng || !this.state.propertyData.lng || !this.state.propertyData.price){
      alert("Please fill out all fields!")
      return false;
    }else{
          ////console.log(formObj)
          API.updateProperty(this.props.match.params.id,this.state.propertyData)
          .then(res => {
            //this.setState({classList : res.data})
            ////console.log(res)
            toast("Property Updated Successfully!", { autoClose: 3000 });

           // this.toggle();
            this.loadProperty()

          })
          .catch(err => {
            if (err.response.status === 401) {
             // alert("Unauthorized user Please log back in!")
              toast("Unauthorized user Please log back in!", { autoClose: 3000 });

              this.props.history.push('/login');
             }  else{
              toast("We are having some server issues, try again later!", { autoClose: 3000 });

             }      
            });
      }

  }






  render() {

   // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

  //  const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    
    return (
      <div className="animated fadeIn" style={{paddingLeft:"20px", paddingRight:"20px"}}>
        <Row>
        
          <Col md={12}>
            <Card >
              <CardHeader>
                <strong>Class Info: </strong>
              </CardHeader>
              <CardBody>
                      <Form>

                      <FormGroup >  
                      <Label for="exampleSelect" >Property Status</Label>
                        <Input type="select" name="active" onChange={this.handleOnChange} value={this.state.propertyData.active}>
                          <option key={0} value="true" >Available</option>
                          <option key={1} value="false" >Rented</option>
                        </Input>
                      
                    </FormGroup>
                      <Row>
                        <Col md="6">
                            <FormGroup>
                              <Label for="exampleEmail">Name</Label>
                              <Input onChange={this.handleOnChange} name="name" defaultValue={this.state.propertyData.name} />
                              
                            </FormGroup>
                            <FormGroup>
                              <Label for="exampleEmail">Square Feet</Label>
                              <Input onChange={this.handleOnChange} name="floor_area_size" defaultValue={this.state.propertyData.floor_area_size}/>
                            
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label for="exampleEmail">Price</Label>
                              <Input onChange={this.handleOnChange} name="price" defaultValue={this.state.propertyData.price}/>
                              <FormFeedback>You will not be able to see this</FormFeedback>
                              <FormText></FormText>
                            </FormGroup>
                            <FormGroup>
                              <Label for="exampleText" >Number Of Rooms</Label>
                              <Input onChange={this.handleOnChange} name="num_of_rooms" defaultValue={this.state.propertyData.num_of_rooms}/>
                            </FormGroup>
                          </Col>
                        </Row>

                        <hr></hr>
                        <Row>
                        <Col md="12">
                        <FormGroup >
                        <Label for="exampleText">Description</Label>
                        <Input onChange={this.handleOnChange} name="description" id="" defaultValue={this.state.propertyData.description}/>
                      </FormGroup>
                        </Col>
                         
                        </Row>
                       

                        <FormGroup>
                        <Label for="exampleEmail">Address </Label>
                        <Input placeholder="FULL MAILING ADDRESS: 13634 w129th place, Olathe, KS 666062" onChange={this.handleOnChange} name="address" value={this.state.propertyData.address}/>
                       </FormGroup>
            
                       <br></br>
                        <Row>

                       
                        <Col md="6">
                        <div>
                        <h5 style={{textAlign:"center"}}> Use Google to pinpoint the Latitude and Longitude of your apartment or manually enter them below</h5>
                        <br></br>
                        <Button onClick={this.getGPS} className="btn primary btn-block">Use Google</Button>
                      </div>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          <Label for="exampleEmail">Latitude</Label>
                          <Input onChange={this.handleOnChange} name="lat" value={this.state.propertyData.lat}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Longitude</Label>
                            <Input onChange={this.handleOnChange} name="lng" value={this.state.propertyData.lng}/>
                          </FormGroup>
                        </Col>
                      </Row>
                        
                        
                      </Form>
                 
              </CardBody>
              <CardFooter>
                <Button className="btn pull-right" onClick = {() => this.handlesubmit()}>Save</Button>
              </CardFooter>
            </Card>
          </Col>
         
        </Row>


        <Modal className="modal-md" isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Create New Video</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input onChange={this.handleOnChange} name="videoname" />
                <FormFeedback>You will not be able to see this</FormFeedback>
                <FormText></FormText>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Vimeo URL</Label>
                <Input onChange={this.handleOnChange} name="videoURL" />
                <FormFeedback>You will not be able to see this</FormFeedback>
                <FormText></FormText>
              </FormGroup>
              
            </Form>
           </ModalBody>
          <ModalFooter>
            <Button className="button-shamana" onClick={this.handlesubmitNewVideo}>Save</Button>{' '}
            <Button className="button-shamana" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal className="modal-md" isOpen={this.state.modalEdit} toggle={this.toggleEdit} >
          <ModalHeader toggle={this.toggleEdit}>Edit Video</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Video ID</Label>
                <Input onChange={this.handleOnChange} name="videoIDedit" defaultValue={this.state.videoIDedit} disabled/>
                <FormFeedback>You will not be able to see this</FormFeedback>
                <FormText></FormText>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input onChange={this.handleOnChange} name="videoNameEdit" defaultValue={this.state.videoNameEdit}/>
                <FormFeedback>You will not be able to see this</FormFeedback>
                <FormText></FormText>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Vimeo URL</Label>
                <Input onChange={this.handleOnChange} name="videoURLEdit" defaultValue={this.state.videoURLEdit}/>
                <FormFeedback>You will not be able to see this</FormFeedback>
                <FormText></FormText>
              </FormGroup>
              
            </Form>
           </ModalBody>
          <ModalFooter>
            <Button className="button-shamana" onClick={this.handlesubmitEditVideo}>Save</Button>{' '}
            <Button className="button-shamana" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default User;
