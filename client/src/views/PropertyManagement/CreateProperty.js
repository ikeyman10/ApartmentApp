import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, CardFooter, Col, Row, Table,Button,Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap';
import API from '../../API/api'
import loadingGif from "../../assets/img/cloud_load.gif"
import confirm from "reactstrap-confirm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()






class Videos extends Component {

  constructor(props) {
    super(props);

     this.getGPS = this.getGPS.bind(this);
     this.handleOnChange = this.handleOnChange.bind(this);

    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);


    this.state = {
      
      propertyArr : [],
      modal1: false,
      name: '',
      price: '',
      floor_area_size: '',
      num_of_rooms: '',
      description: '',
      address: '',
      lat: '',
      lng: '',
      isLoading: false
    }
  }

  componentDidMount(){

    API.checkToken()
    .then(res => {

      if(localStorage.adminLoggedIn === "1x2x3x4x5" || localStorage.realtorLoggedIn === "2x8x3x4x5"){
       
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

  
  

  

  getGPS() {

    if(this.state.address == ''){
      alert("please fill out entire address!")
      return false;
    }
  
    API.getCoordinates(this.state.address)
      .then(res => {

        //console.log(res.data.results[0].geometry.location.lat)
        //console.log(res.data.results[0].geometry.location.lng)
        //console.log(res.data.results[0].formatted_address)

        this.setState({lat : parseFloat(res.data.results[0].geometry.location.lat), lng : parseFloat(res.data.results[0].geometry.location.lng), address : res.data.results[0].formatted_address})
        // this.setState({isLoading : false})

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




  handleOnChange = (event) =>{

    const { name, value } = event.target;
    
      this.setState({[name] : value});
    
    //console.log(this.state)
  }


  handlesubmit = () => {

    let formObj = {
      name: this.state.name,
      price: this.state.price,
      floor_area_size: this.state.floor_area_size,
      num_of_rooms: this.state.num_of_rooms,
      description: this.state.description,
      address: this.state.address,
      lat: this.state.lat,
      lng: this.state.lng,
      realtor_id: localStorage.user
    }

    //console.log(formObj);

    if(isNaN(this.state.lat)){
      toast("Latitude must be a number only!", { autoClose: 3000 });
      return false;
    }else if(isNaN(this.state.lng)){
      toast("Longitude must be a number only!", { autoClose: 3000 });
      return false;
    }else if(isNaN(this.state.price)){
      toast("Price must be a number only!", { autoClose: 3000 });
      return false;
    }else if(isNaN(this.state.num_of_rooms)){
      toast("Number Of Rooms must be a number only!", { autoClose: 3000 });
      return false;
    }else if(!this.state.name || !this.state.floor_area_size || !this.state.num_of_rooms || !this.state.description || !this.state.address || !this.state.lat || !this.state.lng || !this.state.lng){
      toast("Please fill Out all fields!", { autoClose: 3000 });
      return false;
    }else{
        ////console.log(formObj)
        API.saveProperty(formObj)
        .then(res => {
          //this.setState({classList : res.data})
          ////console.log(res)
          this.setState({name : '', address : '', lat : '', lng : '', description : '', floor_area_size: '',  num_of_rooms: '', price : ''});

          toast("Property Updated Successfully!", { autoClose: 3000 });
          //this.props.history.push('/project');


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
  }


  render() {

    //const videoList = videoData.filter((video) => video.id < 10)
    //const videoLink = `/videos/${video._id}`

    return (
      <div className="animated fadeIn" style={{paddingLeft:"20px", paddingRight:"20px"}}>
        
      {this.state.isLoading ? (
        //Loading
        <Row  style={{ width:"100%", backgroundColor:"#fff"}}>
          <div style={{marginLeft:"auto", marginRight:"auto"}}>
            <h1 style={{textAlign:"center"}}>
              LOADING!
            </h1>
            <img  src={loadingGif} />

          </div>
        </Row>

      ) : (

        <Row>
          
          <Col xl={12}>
            <Card>
              <CardHeader>
                <h3 className="pull-left">Create An Apartment</h3> <small className="text-muted"></small>
              </CardHeader>
              <CardBody>
              <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="exampleEmail">Name</Label>
                    <Input onChange={this.handleOnChange} name="name" placeholder="apartment Complex Name" value={this.state.name}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Apartment Square Feet</Label>
                    <Input onChange={this.handleOnChange} name="floor_area_size" placeholder="total square feet of the apartment" value={this.state.floor_area_size}/>
                  </FormGroup>
                
                </Col>
                <Col md="6">
                <FormGroup>
                  <Label for="exampleEmail">Price</Label>
                  <Input onChange={this.handleOnChange} name="price" placeholder="price per month" value={this.state.price}/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Number Of Rooms</Label>
                  <Input onChange={this.handleOnChange} placeholder="number of full rooms in the apartment, if studio just put 1" name="num_of_rooms" value={this.state.num_of_rooms}/>
                </FormGroup>
                </Col>
              </Row>
  
             
              <hr></hr>
  
              <FormGroup>
              <Label for="exampleEmail">Address </Label>
              <Input placeholder="full mailing address (i.e. 12230 S Strang Line Ct, Olathe, KS 66062)" onChange={this.handleOnChange} name="address" value={this.state.address}/>
             </FormGroup>
  
             <br></br>
              
              <Row>
                <Col md="6">
                <div>
                <h5 style={{textAlign:"center"}}> Use Google to pinpoint the Latitude and Longitude of your apartment or manually enter them here: </h5>
                <br></br>
                <Button onClick={this.getGPS} className="btn primary btn-block">Use Google</Button>
              </div>
                </Col>
                <Col md="6">
                <FormGroup>
                    <Label for="exampleEmail">Latitude</Label>
                    <Input onChange={this.handleOnChange} name="lat" value={this.state.lat}/>
                  </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Longitude</Label>
                  <Input onChange={this.handleOnChange} name="lng" value={this.state.lng}/>
                </FormGroup>
                
                </Col>
              </Row>
                      
             
              <hr></hr>
  
               
  
                <FormGroup row>
                  <Label for="exampleText" sm={2}>Description</Label>
                  <Col sm={10}>
                    <Input onChange={this.handleOnChange} placeholder="describe amenities and other perks of the apartment or complex" type="textarea" name="description" id="" value={this.state.description}/>
                  </Col>
                </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="button-shamana" onClick={this.handlesubmit}>Save</Button>{' '}
                <Button className="button-shamana" onClick={this.toggle}>Cancel</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      )}

      
      </div>
    )
  }
}

export default Videos;
