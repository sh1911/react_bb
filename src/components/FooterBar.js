import React from 'react';
import {Navbar,Container,Col} from 'react-bootstrap'
class FooterBar extends React.Component{

    render()
	{
        let year=new Date().getFullYear();
		return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col class="w-25 p-3" className="text-center text-muted">
                        <div>{year}-{year+1}, All Rights Reserved by @BooldsBrother </div>
                    </Col>
                </Container>
            </Navbar>
            
        )
    }
}
export  default FooterBar;