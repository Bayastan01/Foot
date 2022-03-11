import React, { Component } from 'react';
import './Pages css/Home.css';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'



export default class Home extends Component {
    constructor(props) {
        super(props)

        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((data) => {
                this.setState({ categories: data.data.categories})
            })
        this.state = {
            categories: []
        }
    }

    render() {    
        return (
            <div className="block11">
                <Container className="block12">
                    {
                        this.state.categories.map((item,id) => {
                            return (
                                <Card as={Link} style={{textDecoration:'none'}} to={`/category/${item.strCategory}`} className="card11" key={id}>
                                    <div className="img1" style={{ backgroundImage: `url(${item.strCategoryThumb})`, marginTop: '2px' }}></div>
                                    <Card.Body>
                                        <Card.Title className="text-center">{item.strCategory}</Card.Title>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </Container>
            </div>
        )
    }
}
