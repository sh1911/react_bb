import React ,{Component} from 'react';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AlertToast from './AlertToast'
export default class Register extends Component{


    constructor(props)
    {
        
        super(props)
        this.state={
            fname:"",
            lname:"",
            email:"",
            passwd1:"",
            passwd2:"",
            errorMessage:"",
            successMessage:"",
            show:""
         

        }
        this.state.show=false;
        this.register=this.register.bind(this);
        this.onChange=this.onChange.bind(this);
        
    }
    onChange(e)
    {
        
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state);
        
    }
    register(e)
    {
        e.preventDefault()
        this.setState({
            successMessage:"",
            errorMessage:""
        })
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
            });
           
        }

    }
    render()
    {
        if(this.state.successMessage.length>0)
        {
            return(
                <div>
                <Redirect to={{
                        pathname:'/otp',
                        state:{mssg:this.state.successMessage}}} />
                </div>
                )
            }
        else 
        {       
            return (
            <div>
            {this.state.errorMessage.length>0?<AlertToast message={this.state.errorMessage} hmessage={"error"} show={true} type={"danger"}/> :null }
            <Card className={"border border-light bg-light text-black col-8 mx-auto"}>
            <Card.Header  align="center">Registration Form</Card.Header>
            <Card.Body className="mx-auto">
            <form classNam="center" onSubmit={this.register}>
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
            <div className="form-row justify-content-left">
            <div className="form-group mx-sm-3 mb-2" >
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter Password" name="passwd1" value={this.state.passwd1} onChange={this.onChange} required/>
            </div>
            <div className="form-group mx-sm-3 mb-2" >
                <label>Confirm Password</label>
                <input type="text" className="form-control" placeholder="Confirm Password" name="passwd2" value={this.state.passwd2} onChange={this.onChange} required/>
            </div>
            </div>
            <br/>
            <div className="text-center">
            <button className="btn btn-primary col-4" type="submit" >Register</button>
            </div>
           
                
                
            </form>
            </Card.Body>
            <Card.Footer>
                        Already registered?
                        <a href="login">Login</a>
                        </Card.Footer>
            </Card>
            </div>
            )
        
        }
   
    }
}

