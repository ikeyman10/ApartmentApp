import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, CardFooter, ListGroup, ListGroupItem, Button, Modal, ModalHeader,ModalBody, Form,FormText,FormGroup, Input, Label,FormFeedback,ModalFooter } from 'reactstrap';
import API from '../../API/api'
import loadingGif from "../../assets/img/cloud_load.gif"
import usersData from './UsersData'
import confirm from "reactstrap-confirm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row"><Link to={userLink}>{user.id}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.registered}</td>
      <td>{user.role}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    </tr>
  )
}

class Users extends Component {

  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);


    this.state = {
      
      userList : [],
      modal1: false,
      firstname: '',
      lastname: '',
      email: '',
      subscribed: '',
      admin: false,
      realtor: false,
      password: '',
      passwordverify: '',
      isLoading: false
    }
  }

  componentDidMount(){

    API.checkToken()
    .then(res => {
      console.log("authorized")
      if(localStorage.adminLoggedIn === "1x2x3x4x5" || localStorage.realtorLoggedIn === "2x8x3x4x5"){
        this.setState({isLoading : true})
        this.loadUsers();
      }else{
        this.props.history.push('/404');

      }
      
    })
    .catch(err => {
      console.log(err)
      this.props.history.push('/login');

    });
     

  }

  
  async deleteUser(id){

    if (await confirm({
      message: 'Are you sure you want to delete this user?',
      confirmText: "Yes I'm Sure"
    })) {
      API.deleteUser(id)
      .then(res => {
        
        this.loadUsers()
    
      })
      .catch(err => console.log(err));
    } else {
      console.log('no');
    }
  }

  toggle = () => this.setState({modal1 : !this.state.modal1});


  // Loads all books and sets them to books
  loadUsers() {
    API.getUsers()
      .then(res => {

        this.setState({userList : res.data})
        this.setState({isLoading : false})

      })
      .catch(err => {

        console.log(err)
        this.setState({isLoading : false})

      });
  };


  handleOnChange = (event) =>{

    const { name, value } = event.target;
    
      this.setState({[name] : value});
    

  }

  checkUserType = (admin, realtor) =>{

    if(admin){
      return "Admin";
    }else if(realtor){
      return "Realtor"
    }else{
      return "User"
    }
}

  handlesubmit = () => {

    

    let formObj = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email.trim(),
      subscribed: this.state.subscribed,
      admin: this.state.admin,
      password: this.state.password.trim(),
      realtor: this.state.realtor
    }

    console.log(formObj);

    if(!this.state.firstname || !this.state.lastname){
      alert("Please fill out all fields!")
      return false;
    }else{
        //console.log(formObj)
        API.register(formObj)
        .then(res => {
          //this.setState({classList : res.data})
          //console.log(res)
          this.toggle();
          this.loadUsers()
          toast("User created successfully!", { autoClose: 3000 });


        })
        .catch(err => {
          if (err.response.status === 401) {
           // alert("Unauthorized user Please log back in!")
            toast("Unauthorized user Please log back in!", { autoClose: 3000 });

            this.props.history.push('/login');
           }  else{
            toast("We are having some server issues, try again later!", { autoClose: 3000 });

           }  
    })
  }
}

  render() {

    //const userList = usersData.filter((user) => user.id < 10)

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
                <h3 className="pull-left">Users List</h3> <small className="text-muted"></small> <button onClick={this.toggle} className="btn-md btn-secondary btn pull-right  ">Create New User</button>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">User Type</th>
                      <th scope="col">created_date</th>
                      <th scope="col" style={{minWidth:"90px"}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userList.map((user, index) =>

                      <tr key={user._id.toString()} >
                      {/* <th scope="row"><Link to={videoLink}>{video._id}</Link></th>*/} 
                       <td><h5><b>{user.firstname}</b></h5></td>
                       <td><h5><b>{user.lastname}</b></h5></td>
                       <td>{user.email}</td>
                       <td>{this.checkUserType(user.admin, user.realtor)}</td>
                       <td>{user.created_date}</td>
                       <td>
                          <Link className="pull-left" to={`/users/${user._id}`}><Button className="pull-left btn-sm" color="warning" ><i className="fa fa-pencil"></i></Button></Link>
                          <Button onClick={() => this.deleteUser(user._id)} className="btn-sm pull-right" color="danger" ><i className="fa fa-trash"></i></Button> 
                     </td>
                     </tr>

                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}


      <Modal className="modal-lg" isOpen={this.state.modal1} toggle={this.toggle} >
      <ModalHeader toggle={this.toggle}>Create New User</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">First Name</Label>
            <Input onChange={this.handleOnChange} name="firstname" />
            <FormFeedback>You will not be able to see this</FormFeedback>
            <FormText></FormText>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Last Name</Label>
            <Input onChange={this.handleOnChange} name="lastname" />
            <FormFeedback>You will not be able to see this</FormFeedback>
            <FormText></FormText>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input onChange={this.handleOnChange} name="email" />
            <FormFeedback>You will not be able to see this</FormFeedback>
            <FormText></FormText>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Password</Label>
            <Input onChange={this.handleOnChange} name="password" />
            <FormFeedback>You will not be able to see this</FormFeedback>
            <FormText></FormText>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Password (confirm)</Label>
            <Input onChange={this.handleOnChange} name="passwordverify" />
            <FormFeedback>You will not be able to see this</FormFeedback>
            <FormText></FormText>
          </FormGroup>
          <FormGroup >  
          <Label for="exampleSelect" >Admin</Label>
            <Input type="select" name="admin" onChange={this.handleOnChange} >
              
              <option key={1} value="false" selected>False</option>
              <option key={0} value="true" >True</option>
            </Input>
          
          </FormGroup>
            <FormGroup >  
            <Label for="exampleSelect" >Realtor</Label>
              <Input type="select" name="realtor" onChange={this.handleOnChange} >
                <option key={1} value="false" selected>False</option>
                <option key={0} value="true" >True</option>
                
              </Input>
          
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

export default Users;
