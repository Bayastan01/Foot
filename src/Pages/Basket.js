import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './Pages css/Basket.css';
import Card1 from '../components/Card';
import Modal1 from '../components/Modal';

export default class Basket extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        if (this.props.basket.length > 0) {
            return (
                <>
                    <h1 className="text-center">
                        Количетво товаров ({this.props.basket.length})
                        <span className="mx-4"><Modal1 /></span>
                    </h1>
                    <div className="block51">
                        <Container className="block52">
                            {
                                this.props.basket.map((item) => {
                                    return (
                                        <>
                                            <Card1 item={item} Addbasket={this.props.Addbasket} basket={this.props.basket} />
                                        </>
                                    )
                                })
                            }
                        </Container>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="img22"><h1 className="text-center mt-2">Прости вы не сохранили ничего</h1></div>
                </>

            )
        }
    }
}
