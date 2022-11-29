import React, { Component } from 'react';
import { Button, Modal, Form, } from 'react-bootstrap';
import axios from 'axios';

export default class Modal1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            name: '',
            number: Number(''),
            address: '',
            basket: JSON.parse(localStorage.getItem('basket')) || [],
            meal: ''
        }
    }

    handleClose = () => {
        this.setState({
            show: false
        })
        axios.get('https://api.telegram.org/bot5916982453:AAEmsgcIJ7F0rrEKYsfe2JWQOSTvDfBiNhI/sendMessage', {
            params: {
                chat_id: '868287401',
                text:
                    `Заказ: \n \n Имя: ${this.state.name} \n Номер : ${this.state.number} \n Адресь : ${this.state.address} \n \n Еды: \n${this.state.meal} `
            }
        })
    }

    handleShow = () => {
        const a = this.state.basket.map((item,i) => {
            return `\n ${i +1})${item.strMeal}`
        })
        this.setState({
            meal: a
        })
        this.setState({
            show: true
        })
    }
    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Товары ({this.state.basket.length})
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Веедите данные</Modal.Title>
                    </Modal.Header>
                    <Form className="p-2 m-2">
                        <Form.Group onChange={e => this.setState({ name: e.target.value })} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Веедите имя</Form.Label>
                            <Form.Control type="text" placeholder="имя" />
                        </Form.Group>
                        <Form.Group onChange={e => this.setState({ number: e.target.value })} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Веедите номер</Form.Label>
                            <Form.Control type="phone" name="telField" pattern="[0-9] {3}-[0-9]- {3}-[0-9] {3}" reguired placeholder="номер" />
                        </Form.Group>
                        <Form.Group onChange={e => this.setState({ address: e.target.value })} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Веедите адрес</Form.Label>
                            <Form.Control type="text" placeholder="адрес" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Beef and Mustard Pie" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicCheckbox2">
                            <Form.Check type="checkbox" label="Beef and Oyster pie" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicCheckbox3">
                            <Form.Check type="checkbox" label="Beef Banh Mi Bowls with Sriracha Mayo  Carrot & Pickled Cucumber" />
                        </Form.Group>
                        <hr />
                        <Form.Group className="mb-3" controlId="formBasicCheckbox4">
                            <Form.Check type="checkbox" label="Remove Meals from after order" />
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
