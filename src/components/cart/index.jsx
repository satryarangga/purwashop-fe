import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from '../layouts/header.jsx';
import './cart.css';
import axios from 'axios';

const cart = [
	{
		productName:"Buku Tulis",
		price:20000,
		qty:2,
		subtotal:40000
	},
	{
		productName:"Buku Mewarnai",
		price:30000,
		qty:3,
		subtotal:90000
	}
];

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		this.getData(result => {
			this.setState({data:result.data});
		})
	}

	getData(callback) {
		const customer = JSON.parse(localStorage.getItem('purwashop_auth'));
		axios.get(`http://localhost:3210/cart/${customer._id}`)
		.then(callback);
	}

	handleDeleteCart(cart) {
		axios.delete(`http://localhost:3210/cart/${cart.id}`)
			.then(result => {
				alert("Sukes delete");
				this.getData(result => {
					this.setState({data:result.data});
				})
			})
	}

	showCarts() {
		const { data } = this.state;
		return data.map( val => {
			return (
				<tr>
					<td>{val.productName}</td>
					<td>{val.price}</td>
					<td>{val.qty}</td>
					<td>{val.subtotal}</td>
					<td><Button 
							onClick={this.handleDeleteCart.bind(this, val)} 
							color="danger">X</Button></td>
				</tr>
			)
		})	
	}

	render() {
		return (
			<div>
				<Header />
				<Table className="cartTable">
					<thead>
						<tr>
							<th>Nama Produk</th>
							<th>Harga</th>
							<th>Jumlah</th>
							<th>Subtotal</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{ this.showCarts() }
					</tbody>
				</Table>
				<Link to='/checkout'>
					<Button style={{float:"right",marginRight:"20px"}} color="success">
						Lanjut Checkout
					</Button>
				</Link>
			</div>
		)
	}
}

export default ShoppingCart;