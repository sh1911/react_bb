import React from 'react';
import {Carousel} from 'react-bootstrap'
// Image from 'react-image-resizer';

class CarouselBar extends React.Component {

	render()
	{
		return (
				<div>
					<Carousel>
					<Carousel.Item>
				    	<img className="w-75 p-3"  src={require('../images/blood_1.webp')} 	alt="First slide"/>
				    <Carousel.Caption>
				      <h3>First slide label</h3>
				      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				    </Carousel.Caption>
				  </Carousel.Item>
				  <Carousel.Item>
				  <img className="w-75 p-3"	src={require('../images/blood_3.webp')} 	alt="First slide"/>
				    <Carousel.Caption>
				      <h3>Second slide label</h3>
				      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				    </Carousel.Caption>
				  </Carousel.Item>
				  <Carousel.Item>
				  <img className="w-75 p-3"	src={require('../images/blood_04.webp')} 	alt="First slide"/>
				    <Carousel.Caption>
				      <h3>Third slide label</h3>
				      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
				    </Carousel.Caption>
				  </Carousel.Item>
				</Carousel>
			</div>)
	}
	
}
export default CarouselBar;