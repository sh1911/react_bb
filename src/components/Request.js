import React from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import {Col} from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AlertToast from './AlertToast'
export default class Request extends React.Component{

  constructor(props)
    {
       
        super(props)
        this.state={
            cities:[],
            zip:"",
            email:"",
            states:[],
            bloodgroup:"",
            sign:"",
            country:'',
            name:"",
            countries:[],
            errorMessage:"",
            successMessage:""

        }
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        
    }
    
    componentDidMount(){
      this.findAllCountries();
      this.findAllStates();  
    }
    findAllCountries = () => {
     
      axios.get("http://localhost:8088/resource/countries")
          .then(response => {
            this.setState({
                countries: response.data})
                
            })      
  };
  findAllStates = () => {
     
    axios.get("http://localhost:8088/resource/states")
        .then(response => 
          this.setState({
            states: response.data    
        }))        
};

    onChange(e)
    {
        
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state);
        
    }
    onSubmit(e)
    {

        e.preventDefault()
        const URL="http://localhost:8088/resource/"
        const endpoint="addDonar"

            axios({
                method:'post',
                url:`${URL}${endpoint}`,
                data:{
                    "name": `${this.state.name}`,
                    "email": `${this.state.email}`,
                    "state":`${this.state.state}`,
                    "zipcode":`${this.state.zip}`,
                    "city":`${this.state.city}`,
                    "country":`${this.state.country}`,
                    "bloodgroup":`${this.state.bloodgroup}${this.state.sign}`,
                    "sign":`${this.state.sign}`},         
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response=>{
                if(response.data!=null)
                {
                  this.setState({
                      successMessage:response.data})
                }
                })
            .catch(err =>{
              if(err.response!=null)
              {
              this.setState({
                  errorMessage:err.response.data})
              }
              else
              {
                  this.setState({
                      errorMessage:err.message})
              }
                
            })
    }
	render()
	{
    if(this.state.successMessage.length>0)
    {
      return (<div>
        <Redirect to={{
                        pathname:'/otp',
                        state:{mssg:this.state.successMessage}}} />
                </div>
      )
    }
    else
    {
		return(
      <div>
        {this.state.errorMessage.length>0?<AlertToast message={this.state.errorMessage} hmessage={"error"} show={true} type={"danger"}/> :null }
        <Card className="border border-light bg-light text-black col-8 mx-auto">
            <Card.Header align="center ">Donate From </Card.Header>
            <Card.Body>
            <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter FullName" name="name" value={this.state.name} onChange={this.onChange} required />
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange} required />
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group  as={Col} controlId="formGridState">
            <Form.Label>Blood Group</Form.Label>
            <Form.Control as="select" defaultValue="Choose..." name="bloodgroup" value={this.state.bloodgroup} onChange={this.onChange} required>
              <option>Choose...</option>
              <option>A</option>
              <option>B</option>
              <option>AB</option>
              <option>O</option>
            </Form.Control>
            </Form.Group> 
            <Form.Group  as={Col} controlId="formGridState">
            <Form.Label>Sign</Form.Label>
            <Form.Control as="select" defaultValue="Choose..." name="sign" value={this.state.sign} onChange={this.onChange} required >
            <option>Choose...</option>
              <option>+</option>
              <option>-</option>
            </Form.Control>
            </Form.Group> 
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control as="input" placeholder="City.." name="city" value={this.state.city} onChange={this.onChange} required >
            </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control as="input" placeholder="Zip/Pin code" name="zip" value={this.state.zip} onChange={this.onChange} required/>
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group  as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose..." name="state" value={this.state.state} onChange={this.onChange} required>
              <option>Choose...</option>
              {this.state.states.map(state =>
                        <option>{state}</option>
                    )}
            </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Country</Form.Label>
              <Form.Control as="select" defaultValue="Choose..." name="country" value={this.state.country} onChange={this.onChange} required>
              <option>Choose...</option>
              {this.state.countries.map(country =>
                        <option>{country}</option>
                    )}
              </Form.Control>
            </Form.Group>
            </Form.Row>
          <div className="text-center">
                <button className="btn btn-primary col-3" type="submit" >Donate</button>
          </div>
          </Form>
          </Card.Body>
          </Card>
        </div>
        )}                                                                                                                                                             

        }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    