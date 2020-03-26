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
      //console.log("authorized")
      if(localStorage.adminLoggedIn === "1x2x3x4x5" || localStorage.realtorLoggedIn === "2x8x3x4x5"){
        this.setState({isLoading : true})
        this.loadProperty()
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

  toggle = () => {
    
    this.setState({modal1 : !this.state.modal1});
    this.setState({name : '', address : '', lat : '', lng : '', description : '', floor_area_size: '',  num_of_rooms: ''});




    }
  

  // Loads all books and sets them to books
  loadProperty() {
    API.getPropertyRealtor()
      .then(res => {

        console.log(res.data)

        let activePropArr = []
        for(var i =0; i < res.data.length; i++){
         //if(res.data[i].active){
            activePropArr.push(res.data[i])
        //  }
        }

        //console.log(activePropArr)
        this.setState({propertyArr : activePropArr})
        this.setState({isLoading : false})

       
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

    if(this.state.address == ''){
      alert("please fill out entire address!")
      return false;
    }
  
    API.getCoordinates(this.state.address)
      .then(res => {

        //console.log(res.data.results[0].geometry.location.lat)
        //console.log(res.data.results[0].geometry.location.lng)
        //console.log(res.data.results[0].formatted_address)

        this.setState({lat : res.data.results[0].geometry.location.lat, lng : res.data.results[0].geometry.location.lng, address : res.data.results[0].formatted_address})
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


  async deleteProperty(id){

    if (await confirm({
      message: 'Are you sure you want to delete this property?',
      confirmText: "Yes I'm Sure"
    })) {
      API.deleteProperty(id)
      .then(res => {
        
        this.loadProperty()
    
      })
      .catch(err => {
        if (err.response.status === 401) {
          alert("Unauthorized user Please log back in!")
          this.props.history.push('/login');
         }  else{
          alert("We are having some server issues, try again later!")
         }      
        }
        );
    } else {
      //console.log('no');
    }
  }



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

    if(!this.state.name || !this.state.floor_area_size || !this.state.num_of_rooms || !this.state.description || !this.state.address || !this.state.lat || !this.state.lng || !this.state.lng){
      alert("Please fill out all fields!")
      return false;
    }else{
        ////console.log(formObj)
        API.saveProperty(formObj)
        .then(res => {
          //this.setState({classList : res.data})
          ////console.log(res)
          this.toggle();
          this.loadProperty();

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
                <h3 className="pull-left">Apartments</h3> <small className="text-muted"></small> <button onClick={this.toggle} className="btn-md btn-secondary btn pull-right  ">Create New Property</button>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      
                      <th scope="col">name</th>
                      <th scope="col">Sq Ft</th>
                      <th scope="col">Rooms</th>
                      <th scope="col">Price</th>
                      <th scope="col">Active</th>
                      <th scope="col">Realtor</th>
                      <th scope="col" style={{minWidth:"90px", maxWidth:"90px"}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.propertyArr.map((property, index) =>

                      <tr key={property._id.toString()} >
                      {/* <th scope="row"><Link to={videoLink}>{video._id}</Link></th>*/} 
                       <td><h5><b>{property.name}</b></h5></td>
                       <td>{property.floor_area_size}</td>
                       <td>{property.num_of_rooms}</td>
                       <td>{property.price}</td>
                       <td>{property.active.toString()}</td>
                       <td>{property.realtor.firstname + " " + property.realtor.lastname}</td>
                       <td>
                          <Link className="pull-left" to={`/propertymanagement/${property._id}`}><Button className="pull-left btn-sm" color="warning" ><i className="fa fa-pencil"></i></Button></Link>
                          <Button onClick={() => this.deleteProperty(property._id)} className="btn-sm pull-right" color="danger" ><i className="fa fa-trash"></i></Button>
                       </td>
                     </tr>
                      //<UserRow key={index} video={video}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

        <Modal className="modal-lg" isOpen={this.state.modal1} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Create New Class</ModalHeader>
          <ModalBody>
            <Form>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="exampleEmail">Name</Label>
                  <Input onChange={this.handleOnChange} name="name" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Apartment Square Feet</Label>
                  <Input onChange={this.handleOnChange} name="floor_area_size" />
                </FormGroup>
              
              </Col>
              <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">Price</Label>
                <Input onChange={this.handleOnChange} name="price" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Number Of Rooms</Label>
                <Input onChange={this.handleOnChange} name="num_of_rooms" />
              </FormGroup>
              </Col>
            </Row>

           
            <hr></hr>

            <FormGroup>
            <Label for="exampleEmail">Address </Label>
            <Input placeholder="FULL MAILING ADDRESS: 13634 w129th place, Olathe, KS 666062" onChange={this.handleOnChange} name="address" value={this.state.address}/>
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
                <Label for="exampleEmail">Longitude</Label>
                <Input onChange={this.handleOnChange} name="lng" value={this.state.lat}/>
              </FormGroup>
              <FormGroup>
                  <Label for="exampleEmail">Latitude</Label>
                  <Input onChange={this.handleOnChange} name="lat" value={this.state.lng}/>
                </FormGroup>
              </Col>
            </Row>
                    
           
            <hr></hr>

             

              <FormGroup row>
                <Label for="exampleText" sm={2}>Description</Label>
                <Col sm={10}>
                  <Input onChange={this.handleOnChange} type="textarea" name="description" id="" />
                </Col>
              </FormGroup>
            
            
            
            </Form>
           </ModalBody>
          <ModalFooter>
            <Button className="button-shamana" onClick={this.handlesubmit}>Save</Button>{' '}
            <Button className="button-shamana" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      
      </div>
    )
  }
}

export default Videos;
