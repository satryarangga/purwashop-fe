import React, { Component } from 'react';
import Header from '../layouts/header.jsx';
import { Link } from 'react-router-dom';
import {
	Container,
	Row,
	Col
} from 'reactstrap';
import './home.css';

class Home extends Component {
	showData() {
		const data = [
			{
				title:"Belajar Node JS",
				image:"/products/buku1.jpg"
			},
			{
				title:"Belajar Node JS",
				image:"/products/buku1.jpg"
			},
			{
				title:"Belajar Node PHP",
				image:"/products/buku1.jpg"
			},
			{
				title:"Belajar Node JS",
				image:"/products/buku1.jpg"
			},
			{
				title:"Belajar Node JS",
				image:"/products/buku1.jpg"
			},
			{
				title:"Belajar Node JS",
				image:"/products/buku1.jpg"
			},
		];

		return data.map((value) => {
			return (
				<Col md="3" xs="6">
					<Link to="/barang">
						<img className="img-fluid" src={value.image} />
						<h3>{value.title}</h3>
					</Link>
				</Col>
			)
		})
	}

	render() {
		return (
			<div>
				<Header />
				<Container>
					<h2>Daftar Buku</h2>
					<Row>
						{ this.showData() }
					</Row>
				</Container>
			</div>
		)	
	}
}

export default Home;