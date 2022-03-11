import React, { Component } from 'react';
import './Pages css/Search.css';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import Card1 from '../components/Card';

export default class Search extends Component {
    constructor(props) {
        super(props)

        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.match.params.name}`)
            .then((data) => {
                this.setState({ search: data.data.meals, spinner: false })
            })

        this.state = {
            search: [],
            spinner: true
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.search !== this.state.search) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.match.params.name}`)
                .then((data) => {
                    this.setState({ search: data.data.meals, spinner: false })
                })
        } 
        if (this.state.search === null) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.match.params.name}`)
            .then((data) => {
                this.setState({ search: data.data.meals, spinner: false })
            })
        }      
    }

    render() {
        if (this.state.search === null) {
            return (
                <div className="img23"><h1 className="text-center mt-2">Прости у нас нет таково товара</h1></div>
            ) 
        } else {
            return (
                <div className="block41">
                    <Container className="block42">
                        {!this.state.spinner ? (
                            <>
                                {
                                    this.state.search.map((item, i) => {
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
}
