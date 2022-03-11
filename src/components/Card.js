import React, { Component } from 'react';
import { Card, Button, } from 'react-bootstrap';
import './Card.css';
import { Link } from 'react-router-dom';


export default class Card1 extends Component {
    render() {
        const resID = this.props.basket.map(item => item.idMeal);
        const res = resID.includes(this.props.item.idMeal)
            return (
                <Card className="card12">
                    <Card.Body style={{ textDecoration: 'none' }} as={Link} to={`/details/${this.props.item.idMeal}`}>
                        <div className="img12" style={{ backgroundImage: `url(${this.props.item.strMealThumb})`, marginTop: '2px' }}></div>
                        <Card.Title className="text-center">{this.props.item.strMeal}</Card.Title>
                    </Card.Body>
                    <Button variant={res ? 'dark' : 'primary'} onClick={() => this.props.Addbasket(this.props.item)} className="btn12" >{res ? 'dell to basket' : 'add to basket'}</Button>
                </Card>
            );
    }
}
