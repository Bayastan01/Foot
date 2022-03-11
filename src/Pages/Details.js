import React, { Component } from 'react';
import axios from 'axios';
import './Pages css/Details.css';
import { Container, Spinner, Card } from 'react-bootstrap';

export default class Details extends Component {
    constructor(props) {
        super(props)
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.name}`)
            .then((data) => {
                this.setState({ details: data.data.meals, spinner: false })
            })
        this.state = {
            details: [],
            spinner: true
        }
    }

    render() {
        return (
            <div className="block61">
                <Container className="block62">
                    {!this.state.spinner ? (
                        <>
                            {
                                this.state.details.map((item, id) => {
                                    return (
                                        <Card className="card31" key={id}>
                                            <div className="img13" style={{ backgroundImage: `url(${item.strMealThumb})`, marginTop: '2px' }}></div>
                                            <h2 className="text-center mt-3">Area : {item.strArea}</h2>
                                            <h2 className="text-center">Tags : {item.strMeal}</h2>
                                            <h2 className="text-center">Category : {item.strCategory}</h2>
                                            <hr />
                                            <Card.Body>
                                                <Card.Title className="text-center">{item.strInstructions}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                        </>
                    ) : (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                </Container>
            </div>
        )
    }
}
