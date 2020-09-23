import React ,{Component} from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AlertToast from './AlertToast';
export default class OTPform extends Component{

    constructor(props){
        super(props)
        this.state={
            otp:'',
            message:"",
            successMessage:"",
            errorMessage:""
        }
        this.state.show=true;
        this.submitForm=this.submitForm.bind(this);
        this.onChange=this.onChange.bind(this);

        
    }
        
        onChange(e)
        {
            
            this.setState({
                [e.target.name]:e.target.value
            })
            console.log(this.state.otp);
            
        }
        submitForm(e)
        {

            e.preventDefault()
            this.setState({
                successMessage:"",
                errorMessage:""
            })
            const URL="http://localhost:8088"
            const endpoint="/resource/otp"
            axios({
                method:'post',
                url:`${URL}${endpoint}`,
                data:{
                    "otp":`${this.state.otp}`
                        },
                headers: { 'Content-Type': 'application/json' }
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
                return(
                <div>
                 <Redirect to={{
                        pathname:'/home',
                        state:{mssg:this.state.successMessage},type:"success"}} />
                </div>
                )
            }            
            else
            {
            return (
                <div>
                    {this.props.location.state.mssg!=null?<AlertToast message={this.props.location.state.mssg} show={true} hmessage={"success"} type={"success"}/>:null}
                    {this.state.errorMessage.length>0?<AlertToast message={this.state.errorMessage} show={true} hmessage={"error"} type={"danger"}/>:null}
                    <Card className={"border border-light bg-light text-black col-8 mx-auto"}>
                    <Card.Header  align="center">OneTimePasswordForm</Card.Header>
                    <Card.Body className="mx-auto">
                    <form classNam="mx-auto" onSubmit={this.submitForm}>
                    <div className="form-row justify-content-left">
                    <div className="form-group mx-sm-3 mb-2">
                        <label>OneTimePassword</label>
                        <input className="form-control" type="text" placeholder="OTP" name="otp" value={this.state.otp} onChange={this.onChange} required/>
                    <br/>
                    <button className="btn btn-primary" type="submit" onClick={this.submitForm}>submit</button>
                    </div>
                    </div>
                    </form>
                    </Card.Body>
                 </Card>
                 </div>
            )
            }
        }

}
