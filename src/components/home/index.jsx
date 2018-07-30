import React, { Component } from 'react';
import Header from '../layouts/header.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	Container,
	Row,
	Col,
	Progress
} from 'reactstrap';
import './home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
	}

	componentDidMount() {
		axios.get('http://localhost:3210/product')
		.then((res) => {
			this.setState({
				data:res.data
			});
		})
	}

	showData() {
		const {data} = this.state;
		if(data) {
			return data.map((value) => {
				return (
					<Col key={value.id} md="3" xs="6">
						<Link to={`/barang/${value.author}/${value.title}`}>
							<img className="img-fluid" src={value.image} />
							<h3>{value.title}</h3>
						</Link>
					</Col>
				)
			})
		}
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