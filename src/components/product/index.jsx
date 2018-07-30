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
import axios from 'axios';

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
	}

	handleAddCart(productId) {
		alert(`Product ${productId} Added`);
	}

	componentDidMount() {
		const { match } = this.props;

		axios.get(`http://localhost:3210/product/${encodeURIComponent(match.params.author)}/${encodeURIComponent(match.params.title)}`)
		.then((res) => {
			this.setState({
				data:res.data
			});
		})
	}

	render() {
		const { data } = this.state;

		if(data) {
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
									className="img-fluid"  
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

		return <h3>Loading...</h3>
	}
}

export default Product;