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
			data: null,
			qty: 1,
			auth: false
		}
	}

	handleAddCart(data) {
		const { auth } = this.state;

		if(auth) {
			var param = {
				customer_id: auth._id,
				product_id: data._id,
				price: data.price,
				qty: this.state.qty,
				subtotal: this.state.qty * data.price
			}
			axios.post(`http://localhost:3210/cart`, param)
			.then( response => {
				alert(`Product ${response.data.product_id} Added`);
			});
		} else {
			alert('Please login');
			window.location.href = "/register";
		}
	}

	handleChangeQty(type) {
		let { qty } = this.state;
		if(type == "plus") {
			qty++;
		} else {
			qty--;
		}

		this.setState({
			qty
		})
	}

	componentDidMount() {
		const { match } = this.props;

		const auth = JSON.parse(localStorage.getItem('purwashop_auth'));
		if(auth && auth.name) {
			this.setState({
				auth
			})
		}

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
								<div className="qtyContainer">
									<a onClick={this.handleChangeQty.bind(this, "minus")}>-</a>
									<input type="number" value={this.state.qty} />
									<a onClick={this.handleChangeQty.bind(this, "plus")}>+</a>
								</div>
								<Button 
									color="primary"
									onClick={this.handleAddCart.bind(this, data)}
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