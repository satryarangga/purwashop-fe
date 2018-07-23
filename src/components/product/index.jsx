import React, { Component } from 'react';
import Header from '../layouts/header.jsx';
import {
	Row,
	Col,
	Container,
	Button
} from 'reactstrap';
import './product.css';
import angka from 'numeral';

const data = {
	id:4,
	title: "Belajar PHP",
	price: 200000,
	stock: 10,
	image: "/products/buku1.jpg"
}

class Product extends Component {
	handleAddCart(productId) {
		alert(`Product ${productId} Added`);
	}

	render() {
		return (
			<div>
				<Header />
				<Container>
					<Row>
						<Col 
							md={6}
							className="bookImage"
						>
							<img
								className="img-responsive"  
								src={data.image}
							/>
						</Col>
						<Col md={6}>
							<h2>{data.title}</h2>
							<h3>Price: {angka(data.price).format(0,0)}</h3>
							<h3>Stock: {data.stock}</h3>
							<Button 
								color="primary"
								onClick={this.handleAddCart.bind(this, data.id)}
							>
								Add to Cart
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		)

	}
}

export default Product;