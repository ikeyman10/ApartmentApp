import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CustomInput } from 'reactstrap';
import API from '../../../API/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


class Register extends Component {


  constructor(props) {
    super(props);

    this.state = {
      
      firstname : '',
      lastname: '',
      email: '',
      password: '',
      cpassword: '',
      realtor: false
     
    }
  }

  componentDidMount() {

    localStorage.isLoggedIn = 0
    localStorage.loggedInAsGuest = 0
    localStorage.adminLoggedIn = 0
    localStorage.subscribed = ''
    localStorage.realtorLoggedIn = ''
  }



  handleOnChange = (event) =>{

    const { name, value } = event.target;

      if(name == "realtor"){
        this.setState({[name] : event.target.checked});
      }else{
        this.setState({[name] : value});
      }
    

  }


  logout(e) {
    
    localStorage.isLoggedIn = 0
    localStorage.adminLoggedIn = 0
    localStorage.user = ''
    this.props.history.push('/login')
  }


  handlesubmit = () => {

    
    if(!this.state.firstname || !this.state.lastname || !this.state.email || !this.state.password || !this.state.cpassword){
      alert("Please fill out all fields!")
      return false;
    }else if(this.state.password !== this.state.cpassword){
      alert("Please make sure passwords match")
      return false;
    }

    let formObj = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email.toLowerCase().trim(),
      password: this.state.password.trim(),
      realtor: this.state.realtor
    }

    //console.log(formObj);

    if(!this.state.firstname || !this.state.lastname){
      alert("Please fill out all fields!")
      return false;
    }else{
        //console.log(formObj)
        API.register(formObj)
        .then(res => {
          
          console.log(res.data)
          
          if(res.data.status == 500){
            toast("Failed to create a user! ", { autoClose: 5000 });
          }else if(res.data.status = 200){
            this.login()
          }
        })
        .catch(err => {
          console.log(err)
          toast("Error with our system, try again later", { autoClose: 5000 });

        });
    }
  }


  login = () => {

    

      API.login(this.state.email, this.state.password)
      .then(res => {

        console.log(res.data)
        if(res.data.admin){
          localStorage.adminLoggedIn = "1x2x3x4x5";
          localStorage.user = res.data.id;
          this.props.history.push('/dashboard');
        }else if(res.data.realtor){
          localStorage.user = res.data.id;
          localStorage.realtorLoggedIn = "2x8x3x4x5";
          this.props.history.push('/dashboard');
        }
        else{ 
          localStorage.user = res.data.id;
          this.props.history.push('/home');
        }
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
  }





  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="First Name" name="firstname" autoComplete="first name" onChange={this.handleOnChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Last Name" name="lastname" autoComplete="last name" onChange={this.handleOnChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" name="email" autoComplete="email" onChange={this.handleOnChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" autoComplete="new-password" onChange={this.handleOnChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" name="cpassword" autoComplete="new-password" onChange={this.handleOnChange} />
                    </InputGroup>

                    <CustomInput type="switch" id="realtor"  name="realtor" label="Are you a Realtor" onChange={this.handleOnChange}/>
                    <hr></hr>
                    <Button color="success" block onClick = {() => this.handlesubmit()}>Create Account</Button>
                    
                    
                    <Button color="success" block onClick = {() => this.logout()}>Login</Button>

                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
