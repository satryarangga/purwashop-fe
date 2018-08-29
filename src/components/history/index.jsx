import React, { Component } from 'react';
import Header from '../layouts/header';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';

class History extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: []
		}
	}

	componentDidMount(callback) {
		this.getDataTransaction(result => {
			this.setState({history:result.data});
		});
	}

	getDataTransaction(callback) {
		const customer = JSON.parse(localStorage.getItem('purwashop_auth'));
		if(!customer) {
			this.setState({unauthorized:true});
		} else {
			axios.get(`http://localhost:3210/payment/history/${customer._id}`)
			.then(callback);
		}
	}

	showDetailOrder(detail) {
		return detail.map((value, key) => {
			return (
				<div>
					{value.product_name} x {value.qty}
				</div>
			)
		});
	}

	showTransaction() {
		const { history } = this.state;

		return history.map((value, key) => {
			return (
				<tr>
					<td>{value.id}</td>
					<td>{moment(value.order_date).format("MMM Do YY")}</td>
					<td>{value.payment_method_name}</td>
					<td>{this.showDetailOrder(value.detail)}</td>
					<td>{numeral(value.total_purchase).format('0,0')}</td>
				</tr>
			)
		})
	}

	render() {
		return (
			<div>
				<Header />
				<Table>
			        <thead>
			          <tr>
			            <th>#</th>
			            <th>Tanggal</th>
			            <th>Metode Pembayaran</th>
			            <th>Barang</th>
			            <th>Biaya</th>
			          </tr>
			        </thead>
			        <tbody>
			        { this.showTransaction() }
			        </tbody>
			      </Table>
			</div>
		)
	}
}

export default History;