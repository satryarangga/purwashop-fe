import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../layouts/header';
import { Container, 
		 Row,
		 Col, 
		 Form, 
		 FormGroup, 
		 Label,  
		 Input,
		 Button,
		 ListGroup,
		 ListGroupItem
} from 'reactstrap';
import axios from 'axios';
import numeral from 'numeral';
import './checkout.css';

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPayment:null,
			selectedPaymentId:null,
			unauthorized: false,
			customer: {},
			cart:[],
			paymentMethod: [],
			cartTotal:0
		}

		this.handleChangeInput = this.handleChangeInput.bind(this);
	}

	getPaymentMethod() {
		axios.get('http://localhost:3210/payment')
		.then(result => {
			this.setState({
				paymentMethod:result.data
			})
		})
	}
	getCustomer(){
		const customer = JSON.parse(localStorage.getItem('purwashop_auth'));
		if(!customer) {
			this.setState({unauthorized:true});
		} else {
			axios.get(`http://localhost:3210/customer/${customer._id}`)
			.then(result => {
				this.setState({
					customer:result.data
				})
			})
		}
	}

	getDataCart(callback) {
		const customer = JSON.parse(localStorage.getItem('purwashop_auth'));
		if(!customer) {
			this.setState({unauthorized:true});
		} else {
			axios.get(`http://localhost:3210/cart/${customer._id}`)
			.then(callback);
		}
	}

	componentDidMount() {
		let { cartTotal } = this.state;
		const customer = JSON.parse(localStorage.getItem('purwashop_auth'));
		if(!customer) {
			this.setState({unauthorized:true});
		}
		this.getPaymentMethod();
		this.getCustomer();

		this.getDataCart(result => {
			this.setState({cart:result.data});
			result.data.map((value, key) => {
				cartTotal += value.subtotal;
			})

			this.setState({cartTotal});
		})

		// this.setState({
		// 	customer: JSON.parse(customer)
		// })
	}

	showPaymentMethod() {
		let { paymentMethod, selectedPaymentId } = this.state;
		return paymentMethod.map(value => {
			const color = (selectedPaymentId === value._id) ? "#8e8e8e" : "#fff";

			return (
				<Col md="4">
					<a 
						onClick={this.handleChoosePayment.bind(this, value)}
						style={{cursor:"pointer"}}
					>
						<img 
							className="img-fluid" 
							src={value.logo}
							style={{backgroundColor: color}}
						/>
					</a>
				</Col>
			)
		})
	}

	handleChoosePayment(value) {
		this.setState({
			selectedPayment:`${value.name} : ${value.desc}`,
			selectedPaymentId:value._id
		})
	}

	handleChangeInput(input) {
		let {customer} = this.state;
		customer[input.target.name] = input.target.value;

		this.setState({
			customer
		})
	}

	handleSubmitOrder() {
		const { selectedPaymentId, customer } = this.state;

		if(!selectedPaymentId) {
			alert("Silahkan pilih metode pembayaran");
		} else {
			const param = {
				customer_id: customer._id,
				payment_method_id: selectedPaymentId
			}

			axios.post('http://localhost:3210/payment/finish', param)
				.then((result) => {
					alert("Sukses");
				})
		}
	}

	updateCustomer(event){
		event.preventDefault();
		var param = {
            name: this.state.customer.name,
            email: this.state.customer.email,
            address: this.state.customer.address,
            phone: this.state.customer.phone
        }
		const customer = JSON.parse(localStorage.getItem('purwashop_auth'));
		axios.put(`http://localhost:3210/customer/update/${customer._id}`, param)
		.then(result => {
			this.setState({
				customer:result.data
			})
			alert("sukses ganti data")
		})

	}

	showCarts() {
		let { cart } = this.state;
		if(cart) {
			return cart.map(value => {
				return (
					<ListGroupItem>
						<Row>
							<Col md="6">
								<img className="img-fluid" src={value.productImage} />
							</Col>
							<Col md="6">
								<h3>{value.productName}</h3>
								<span>{value.qty} x {numeral(value.price).format('0,0')}</span>
								<h3 style={{marginTop:"10px"}}>{numeral(value.subtotal).format('0,0')}</h3>
							</Col>
						</Row>
					</ListGroupItem>
				)
			})
		}
	}

	render() {
		const { unauthorized, customer, cartTotal } = this.state;

		if(unauthorized) {
			return <Redirect to="register" />
		}
		return (
			<div>
				<Header />
				<Container className="checkoutContainer">
					<Row>
						<Col md="8">
							<h3>Data Customer</h3>
							<Form style={{marginBottom:"30px"}} onSubmit={this.updateCustomer.bind(this)}>
								<Row>
									<Col md="6">
										<FormGroup>
											<Label>Nama</Label>
											<Input
												onChange={this.handleChangeInput}
												type="text"
												name="name"
												value={customer.name}
											/>
										</FormGroup>
									</Col>
									<Col md="6">
										<FormGroup>
											<Label>Email</Label>
											<Input
												onChange={this.handleChangeInput} 
												type="email"
												name="email"
												value={customer.email}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md="6">
										<FormGroup>
											<Label>Nomor Telepon</Label>
											<Input
												onChange={this.handleChangeInput} 
												type="text"
												name="phone"
												value={customer.phone}
											/>
										</FormGroup>
									</Col>
									<Col md="6">
										<FormGroup>
											<Label>Alamat</Label>
											<Input
												onChange={this.handleChangeInput}
												type="textarea"
												name="address"
												value={customer.address}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Button type="submit" color="success" >Ganti Data Customer</Button>
							</Form>
							<h3>Metode Pembayaran</h3>
							<div className="payment-method-container">
								<Row>
									{ this.showPaymentMethod() }
								</Row>
								<p className="payment-description">
									{this.state.selectedPayment}
								</p>
							</div>
						</Col>
						<Col md="4">
							<h3>Keranjang Belanja</h3>
							<div className="cart-container">
								<ListGroup>
									{ this.showCarts() }
									<ListGroupItem>
										<h2 style={{fontSize:"24px",fontWeight:"600", textAlign:"center"}}>Total: {numeral(cartTotal).format('0,0')} </h2>
									</ListGroupItem>
									<ListGroupItem style={{textAlign:"center"}}>
										<Button onClick={this.handleSubmitOrder.bind(this)} color="primary" size="lg">Submit Order</Button>
									</ListGroupItem>
								</ListGroup>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default Checkout;