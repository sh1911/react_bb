import React from 'react';
import {Container,Jumbotron} from 'react-bootstrap';
class Header extends React.Component{

    render()
	{
        
		return(
         
    <Container>
          
          <Jumbotron className="bg-info text-white col-13 ">
             <h1>BloodsBrother</h1> 
             <blockquote className="blockquote mb-o">
            <p>Welcome to BloodsBrother where you find Helping hands like Brother</p>
            <footer className="blockquote-footer">
                Team BloodsBrother
            </footer>
            </blockquote>
        </Jumbotron>
          
          
     </Container>

            
        )
    }
}
export  default Header;