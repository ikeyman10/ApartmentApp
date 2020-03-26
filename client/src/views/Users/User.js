import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import API from '../../API/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class User extends Component {



    constructor(props) {
      super(props);

      this.state = {
        
        userData : {},
        firstname: '',
        lastname: '',
        email: '',
        subscribed: ''

      }
    }

    componentDidMount(){
      API.checkToken()
      .then(res => {
        console.log("authorized")
        if(localStorage.adminLoggedIn === "1x2x3x4x5" || localStorage.realtorLoggedIn === "2x8x3x4x5"){
          this.loadUser();
        }else{
          this.props.history.push('/404');
  
        }
        
      })
      .catch(err => {
        console.log(err)
        this.props.history.push('/login');
  
      });
     
  
    }
  
  
  
  
    handleOnChange = (event) =>{
  
      const { name, value } = event.target;
     // console.log(value)
  
     
        this.setState({[name] : value});
      
  
      this.setState(prevState => ({
        userData: {                   // object that we want to update
            ...prevState.userData,    // keep all other key-value pairs
            [name] : value    // update the value of specific key
        }
      }))

  
    }
  
  
    // Loads all books and sets them to books
    loadUser() {
      API.getUser(this.props.match.params.id)
        .then(res => {
  
          this.setState({userData : res.data})
          //console.log(this.state.userData)
          
        })
        .catch(err => alert(err));
    };


    createSelectItems() {
       let items = [];         

      if(this.state.userData.subscribed){
        items.push(<option key={0} value="true" >True</option>);   
        items.push(<option key={1} value="false">False</option>);   
  
      }else{
        items.push(<option key={0} value="true" >True</option>);   
        items.push(<option key={1} value="false" >False</option>);   
      }
     
      return items;
    }
    
    
      handlesubmit = () => {

        // console.log(tempObj);
        console.log(this.state.classData);


          if(!this.state.userData.firstname || !this.state.userData.lastname || !this.state.userData.email){
            alert("Please fill out all fields!")
            return false;
          }else{
              //console.log(formObj)
              API.updateUser(this.props.match.params.id,this.state.userData)
              .then(res => {
                //this.setState({classList : res.data})
                console.log(res)
                toast("User Updated Successfully!", { autoClose: 5000 });

                //alert("User Updated Successfully")
                this.loadUser()

              })
              .catch(err => {
                toast("Update Error", { autoClose: 5000 });
                console.log(err)
              });
          }

      }
  







  render() {

   // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

   // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn" style={{paddingLeft:"20px", paddingRight:"20px"}}>
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User Details: </strong>
              </CardHeader>
              <CardBody>
              
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">First Name</Label>
                    <Input onChange={this.handleOnChange} name="firstname" defaultValue={this.state.userData.firstname} />
                  </FormGroup>

                  <FormGroup>
                    <Label for="exampleEmail">Last Name</Label>
                    <Input onChange={this.handleOnChange} name="lastname" defaultValue={this.state.userData.lastname}/>
                    <FormFeedback>You will not be able to see this</FormFeedback>
                    <FormText></FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={this.handleOnChange} name="email" defaultValue={this.state.userData.email}/>
                    <FormFeedback>You will not be able to see this</FormFeedback>
                    <FormText></FormText>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleSelect" sm={4}>Admin</Label>
                    <Col sm={12}>
                      <Input type="select" name="admin" onChange={this.handleOnChange} value={this.state.userData.admin}>
                        {this.createSelectItems()}
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn pull-right" onClick = {() => this.handlesubmit()}>Save</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
