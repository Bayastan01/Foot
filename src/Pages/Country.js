import React, { Component } from 'react'
import './Pages css/Country.css';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import Card1 from '../components/Card';

export default class Country1 extends Component {
    constructor(props) {
        super(props)

        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.match.params.name}`)
            .then((data) => {
                this.setState({ country: data.data.meals, spinner: false })
            })
        
        this.state = {
            country: [],
            spinner: true
        }
    }

    componentDidUpdate( prevProps, prevState) {
        if (prevState.country !== this.state.country) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.match.params.name}`)
            .then((data) => {
                this.setState({ country: data.data.meals, spinner: false })
            })
        }
    }

    render() {
        return (
            <div className="block31">
                <Container className="block32">
                    {!this.state.spinner ? (
                        <>
                            {
                                this.state.country.map((item, i) => {
                                    return (
                                        <Card1 item={item} Addbasket={this.props.Addbasket} basket={this.props.basket} />
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
