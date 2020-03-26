import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import API from '../../../API/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


class Login extends Component {


  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    // this.handleMonthChange = this.handleMonthChange.bind(this);

    
    this.state = {
      
      password: "",
      email: ""

    };

    
  }

  componentDidMount() {

    localStorage.isLoggedIn = 0
    localStorage.loggedInAsGuest = 0
    localStorage.adminLoggedIn = 0
    localStorage.subscribed = ''
    localStorage.realtorLoggedIn = ''
  }


  login = () => {

    //login 

    if(this.state.email == '' || this.state.password == ''){
      alert("Please fill out your login details")
      return false

    }

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
  });
  }
  

  handleOnChange = (event) =>{

    const { name, value } = event.target;
    
      this.setState({[name] : value});
    

  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name="email" onChange={this.handleOnChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" onChange={this.handleOnChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="secondary" className="" onClick={() => this.login()}>Login</Button>
                        </Col>
                      
                        {/*
                          <Col xs="6" className="text-right">
                          <Button color="secondary" className="" href="https://www.shamanacirclestudio.com/reserve?attempt=2#/pricing/site/1">Subscribe Now</Button>
                        </Col>
                        */}
                      
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h3 style={{textAlign:"center"}}>Register Now!</h3>
                      <p className="text-muted " style={{textAlign:"center"}}>You can register to view all apartments in the Kansas City Area! If you are a realtor in the area you can join as a realtor and list your available apartments around the city! </p>
                      
                      <Row>
                        <Col xs="12">
                        <Link className="" to={`/register`}><Button className=" btn-md btn-block" color="success" >Register</Button></Link>

                        {/*  <Button color="secondary" className="btn-block" onClick={() => this.loginAsGuest()}>Continue As Guest</Button>*/ }
                        </Col>
                      
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
