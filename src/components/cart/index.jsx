import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
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
		const customer = JSON.parse(localStorage.getItem('purwashop_auth'));
		axios.get(`http://localhost:3210/cart/${customer._id}`)
			.then( result => {
				this.setState({
					data:result.data
				})
			})
	}

	handleDeleteCart(cart) {
		alert(`${cart.productName} is deleted`);
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
			</div>
		)
	}
}

export default ShoppingCart;