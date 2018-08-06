import React, {Component} from 'react';
import Header from '../layouts/header';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup,Col, Label, Input, FormText, Container,Row } from 'reactstrap';
import axios from 'axios';

class register extends Component{

    constructor(props){
        super(props);
        this.state={
            emailRegister:'',
            nameRegister:'',
            passwordRegister:'',
            addressRegister:'',
            confRegister:'',
            phoneRegister:'',
            redirect: false
        }
        this._handleUserInput = this._handleUserInput.bind();
    }

    _handleUserInput=(event)=>{
        const {e} = event.target;
        this.setState({
           [event.target.name]:event.target.value,
        })
    }

    _handleSubmit = (event)=>{
        event.preventDefault();
        const { 
            emailRegister,
            nameRegister,
            passwordRegister,
            confRegister,
            addressRegister,
            phoneRegister
        } = this.state;

        var param = {
            name: nameRegister,
            email: emailRegister,
            password: passwordRegister,
            address: addressRegister,
            phone: phoneRegister
        }

        if(confRegister !== passwordRegister) {
            alert("Password and Password Confirmation must be same");
            return;
        }

        axios.post('http://localhost:3210/customer/register', param)
            .then(result => {
                alert('Sukses');
                localStorage.setItem('purwashop_auth', JSON.stringify(result.data));
                this.setState({
                    redirect: true
                })
            }).catch(data => {
                alert(data.response.data.message);
            })

    }

    render(){
        if(this.state.redirect) {
            return <Redirect to='/' />
        }

        return(
            <div>
                <Header/>
                <Container>
                    <Row>
                        <Col md="5">
                            <h1>Sign In</h1>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" placeholder="Email" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Password</Label>
                                <Input type="email" name="email" placeholder="Password" />
                            </FormGroup>
                            <Button color="primary">Sign In</Button>
                        </Col>

                        <Col md={{size:5,offset:2}}>
                            <h1>Register</h1>
                            <Form onSubmit={this._handleSubmit.bind(this)}>
                                <FormGroup>
                                    <Label for="exampleEmail">Name</Label>
                                    <Input type="text" name="nameRegister" onChange={this._handleUserInput} placeholder="Fullname" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" name="emailRegister" onChange={this._handleUserInput} placeholder="Email" required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Phone number</Label>
                                    <Input type="text" name="phoneRegister" onChange={this._handleUserInput} placeholder="Phone Number" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Address</Label>
                                    <Input type="text" name="addressRegister"  onChange={this._handleUserInput} placeholder="Address" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Password</Label>
                                    <Input type="password" name="passwordRegister"  onChange={this._handleUserInput} placeholder="Password" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Password Confirmation</Label>
                                    <Input type="password" name="confRegister"  onChange={this._handleUserInput} placeholder="Password Confirmation" />
                                </FormGroup>
                                <Button onClick={this._handleSubmit.bind()} type="submit" color="success">Register</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default register;