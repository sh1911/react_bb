import React ,{Component, useReducer} from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AlertToast from './AlertToast'
import './css/Style.css'
export default class Register extends Component{


    constructor(props)
    {
        
        super(props)
        this.state=this.intialState;
        
        this.state.show=false;
        this.register=this.register.bind(this);
        this.onChange=this.onChange.bind(this);
        this.updateUserByAdmin=this.updateUserByAdmin.bind(this)
        
    }
    intialState={
        fname:"",
        lname:"",
        email:"",
        passwd1:"",
        passwd2:"",
        errorMessage:null,
        successMessage:null,
        updateMessage:null,
        show:"",
        formType:"Registration Form",
        cardFooterdesc:" Already registered?",
        cardFooterLinkype:"Login",
        cardFooterLink:"login",
        buttonType:"Register",
        buttonLink:"",
        role:"  ",
        id:null

    }
    onChange(e)
    {
        
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state);
        
    }
    updateUserByAdmin(e)
    {
       
            const url="http://localhost:8088";
            const endPoint="/admin/users/"+this.state.id;
            const token=`Bearer ${localStorage.getItem("jwttoken")}`;
            const URL=url+endPoint

            axios({
                method:'put',
                url:`${URL}`,
                data:{
                    "fname":`${this.state.fname}`,
                    "lname":`${this.state.lname}`,
                    "email": `${this.state.email}`,
                    "password":`${this.state.passwd1}`,
                    "role":`${this.state.role}`},
                headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
            })
            .then(response => {
                console.log(response)
                this.setState({
                updateMessage:response.data,
                })
                alert(this.state.updateMessage)
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
            });
        }
    componentDidMount(){


        const id=this.props.match.params.id;
        if(id)
        {

            this.setState({
                id:id,
                formType:"Update User",
                cardFooterdesc:" Wanna Goto UsersList?",                                                                                                            
                cardFooterLinkype:"UsersList",
                cardFooterLink:"/admin/userslist",
                buttonType:"Update",
                buttonLink:""
                })
            const url="http://localhost:8088";
            const endPoint="/admin/users/"+id;
            const token=`Bearer ${localStorage.getItem("jwttoken")}`;
            const URL=url+endPoint

            axios({
                method:'get',
                url:`${URL}`,
                headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
            })
            .then(response => {
                this.setState({
                    fname:response.data.fname,
                    lname:response.data.lname,
                    email:response.data.email,
                    role:response.data.role,
                    passwd1:response.data.password,
                })
               
                
            })  
            .catch(err =>{
                if(err.response!=null)
                {
                    this.setState({
                        errorMessage:err.response.status})
                    alert(this.state.errorMessage)
                }
                else
                {
                    this.setState({
                        errorMessage:err.message})
                        alert(this.state.errorMessage)
                }
            });
        }
        
    }

    register(e)
    {
        alert(" register method called")
        e.preventDefault()
        if(this.state.passwd1===this.state.passwd2)
        {
           
            console.log(this.state.email,this.state.passwd1);
            const URL="http://localhost:8088"
            const endpoint="/resource/register"
            axios({
                method:'post',
                url:`${URL}${endpoint}`,
                data:{"email": `${this.state.email}`,
                    "password":`${this.state.passwd1}`,
                    "fname":`${this.state.fname}`,
                    "lname":`${this.state.lname}`},
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response=>{
                if(response.data!=null)
                {
                    this.setState({
                        successMessage:response.data,
                        })
                        alert(response.data)
                }
            })
            .catch(err =>{

                if(err.response!==null)
                {
                this.setState({
                    errorMessage:err.response.data})
                }
                else
                {
                    this.setState({
                        errorMessage:err.message})
                 
                }
            });
           
        }

    }
    render()
    {
        if(this.state.successMessage!==null)
        {
            alert(this.state.successMessage)
           
            return(
                <div>
                <Redirect to={{
                        pathname:'/otp',
                        state:{mssg:this.state.successMessage}}} />
                </div>
                )
            }
        else if(this.state.errorMessage==="403")
        {
            return(
            <Redirect to={{
                pathname:'/home',
                state:{mssg:"You are not authorized as Admin to access admin page",type:"danger"}}} />)
        }
        else 
        {       
            return (
            <div className="jav">
            {this.state.errorMessage!=null?<AlertToast message={this.state.errorMessage} hmessage={"error"} show={true} type={"danger"}/> :null }
            <Card className={"border border-light bg-light text-black col-8 mx-auto"}>
            <Card.Header  align="center">{this.state.formType}</Card.Header>
            <Card.Body className="mx-auto">
            <form classNam="center" >
            <div className="form-row justify-content-left">
            <div className="form-group mx-sm-3 mb-2">
                <label>Frist Name</label>
                <input className="form-control" type="text" placeholder="Frist Name" name="fname" value={this.state.fname} onChange={this.onChange} required/>
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <label>Last Name</label>
                <input className="form-control" type="text" placeholder="Last Name" name="lname" value={this.state.lname} onChange={this.onChange} />
            </div>
            </div>
            <div className="form-group justify-content-left col-12 ">
                <label>Email address</label>
                <input className="form-control " type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange} required/>
            </div>
            
            { this.state.formType==="Update User"?
            
            <div className="form-group justify-content-left ">
            <div className="form-group mx-sm-3 mb-2" >
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" defaultValue="Choose..." name="bloodgroup" value={this.state.role} onChange={this.onChange} required>
              <option>Choose</option>
              <option>USER</option>
              <option>ADMIN</option>
              <option>MANAGER</option>
            </Form.Control>
            </div>
            <div className="form-group mx-sm-3 mb-2" >
                <label>Password</label>
                <input type="text" className="form-control" placeholder="Enter Password" name="passwd1" value={this.state.passwd1} onChange={this.onChange} required/>
            </div>
                <div className="text-center">
                <button className="btn btn-primary col-4" type="submit"  onClick={this.updateUserByAdmin}>{this.state.buttonType}</button>
                </div>
            </div>
            :null}
             { this.state.formType==="Registration Form"?
            <div>
            <div className="form-row justify-content-left">
                <div className="form-group mx-sm-3 mb-2" >
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" name="passwd1" value={this.state.passwd1} onChange={this.onChange} required/>
                    <br/>
                </div>
                <div className="form-group mx-sm-3 mb-2" >
                    <label>Confirm Password</label>
                    <input type="text" className="form-control" placeholder="Confirm Password" name="passwd2" value={this.state.passwd2} onChange={this.onChange} required/>
                </div>
                </div>
                
                <div className="text-center">
                <button className="btn btn-primary col-4" type="submit" onClick={this.register}>{this.state.buttonType}</button>
                </div>
            </div>
            :null} 
            </form>
            </Card.Body>
            
            <Card.Footer aria-disabled  >
                        
             {this.state.cardFooterdesc}          
            <a href={this.state.cardFooterLink}>{this.state.cardFooterLinkype}</a>
            </Card.Footer>
            </Card>
            </div>
            )
        
        }
   
    }
}

