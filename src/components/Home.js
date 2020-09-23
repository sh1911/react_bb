import React from 'react';
//import SearchBar from './SearchBar';
import CarouselBar from './CarouselBar';
import { Container } from 'react-bootstrap';
import Header from "./Header";
import AlertToast from './AlertToast';
export default class Home extends React.Component{
    
	render()
	{
        return(
            <div>
            {this.props.location.state!=null?<AlertToast message={this.props.location.state.mssg} show={true} hmessage={"success"} type={this.props.location.type}/>:null}
            <Container>
                 <Header/>
                <CarouselBar/>
            </Container>
            
            </div>
            )

        }
    }
