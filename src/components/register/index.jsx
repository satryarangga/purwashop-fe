import React, {Component} from 'react';
import Header from '../layouts/header';
import { Button, Form, FormGroup,Col, Label, Input, FormText, Container,Row } from 'reactstrap';

class register extends Component{

    constructor(props){
        super(props);
        this.state={
            emailRegister:'',
            nameRegister:'',
            passwordRegister:'',
            addressRegister:'',
            confRegister:'',
            phoneRegister:''
        }
        this._handleUserInput = this._handleUserInput.bind();
    }

    _handleUserInput=(event)=>{
        const {e} = event.target;
        this.setState({
           emailRegister:event.target.value,
        })
    }
    _handleSubmit = ()=>{
        console.log(`${this.state.emailRegister}\n${this.state.nameRegister}`);
    }
    render(){
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
                            <Button onClick={this._handleSubmit.bind()} color="success">Register</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default register;