import React, { Component } from 'react'
import './Pages css/Categories.css';
import axios from 'axios';
import Card1 from '../components/Card';
import { Container, Spinner } from 'react-bootstrap';


export default class Categories extends Component {
    constructor(props) {
        super(props)
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.props.match.params.name}`)
            .then((data) => {
                this.setState({ category: data.data.meals, spinner: false });
            })
        this.state = {
            category: [],
            spinner: true,
        }
    }

    render() {
        return (
            <div className="block21">
                <Container className="block22">
                    {!this.state.spinner ? (
                        <>
                            {
                                this.state.category.map((item, i) => {
                                    return (
                                        <>
                                            <Card1 item={item} Addbasket={this.props.Addbasket} basket={this.props.basket} />
                                        </>
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
        );
    }
}
