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
            emailLogin:'',
            passwordLogin:'',
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

    _handleSubmitLogin = (event) => {
        const { emailLogin, passwordLogin } = this.state;

        var param = {
            email:emailLogin,
            password:passwordLogin
        }

        axios.post('http://localhost:3210/customer/login', param)
            .then(result => {
                alert('Sukses to login');
                localStorage.setItem('purwashop_auth', JSON.stringify(result.data));
                this.setState({
                    redirect: true
                });
            })
            .catch(error => {
                alert(error.response.data.message);
            })
        event.preventDefault();
    }

    _handleSubmitRegister = (event)=>{
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
                            <Form onSubmit={this._handleSubmitLogin.bind(this)}>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input value={this.state.emailLogin} onChange={this._handleUserInput} type="email" name="emailLogin" placeholder="Email" required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Password</Label>
                                    <Input value={this.state.passwordLogin} onChange={this._handleUserInput} type="password" name="passwordLogin" placeholder="Password" />
                                </FormGroup>
                                <Button type="submit" color="primary">Sign In</Button>
                            </Form>
                        </Col>

                        <Col md={{size:5,offset:2}}>
                            <h1>Register</h1>
                            <Form onSubmit={this._handleSubmitRegister.bind(this)}>
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
                                <Button onClick={this._handleSubmitRegister.bind()} type="submit" color="success">Register</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default register;