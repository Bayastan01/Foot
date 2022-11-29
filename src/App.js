import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl, Card } from 'react-bootstrap';
import './App.css';
import Home from './Pages/Home';
import { Link } from 'react-router-dom'
import Basket from './Pages/Basket';
import Country1 from './Pages/Country';
import axios from 'axios';
import Categories from './Pages/Categories';
import Search from './Pages/Search';
import Details from './Pages/Details';


export default class App extends Component {
    constructor(props) {
        super(props)

        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            .then((data) => {
                this.setState({ country: data.data.meals })
            })

        this.state = {
            country: [],
            search: '',
            basket: JSON.parse(localStorage.getItem('basket')) || [],
            
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.basket !== this.state.basket) {
            localStorage.setItem('basket', JSON.stringify(this.state.basket))
        }
    }

    AddBasket = (a) => {
        const resID = this.state.basket.map(item => item.idMeal);
        const res = resID.includes(a.idMeal)

        if (res) {
            this.setState((p) => {
                const b = p.basket.filter(d => d.idMeal !== a.idMeal);
                return { basket: b };
            })
        } else {
            this.setState((p) => {
                const b = [...p.basket, a];
                return { basket: b };
            })
        }
    }

    Search = () => {
        this.setState({
            search: ''
        })
    }

    render() {
        return (
            <div>
                <Navbar style={{ backgroundColor: 'white' }} expand="lg">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/" style={{ color: 'black', fontSize: '25px', letterSpacing: '5px', fontFamily: 'Dancing Script, cursive' }}>Borsok cafe</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/" style={{ fontFamily: 'sans-serif', marginLeft: '30px', marginRight: '5px' }}>Главная</Nav.Link>
                                <Nav.Link as={Link} to="/basket" style={{ fontFamily: 'sans-serif', marginRight: '5px' }}>Корзина ({this.state.basket.length})</Nav.Link>
                                <NavDropdown variant="danger" title="Страна" id="navbarScrollingDropdown">
                                    {
                                        this.state.country.map((item, i) => {
                                            return (
                                                <NavDropdown.Item key={i} as={Link} to={`/country/${item.strArea}`} style={{ fontFamily: 'sans-serif', }}>{item.strArea}</NavDropdown.Item>
                                            )
                                        })
                                    }
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    onChange={(e) => this.setState({ search: e.target.value })}
                                    type="search"
                                    placeholder="Поиск"
                                    className="me-2"
                                    aria-label="Search"
                                    value={this.state.search}
                                />
                                <Button  variant="dark" as={Link} to={`/search/${this.state.search}`}>Поиск</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path="/basket" >
                        <Basket basket={this.state.basket} Addbasket={(...k) => this.AddBasket(...k)} />
                    </Route>
                    <Route path="/country/:name">
                        {p => <Country1 {...p} Addbasket={(...k) => this.AddBasket(...k)} basket={this.state.basket} />}
                    </Route>
                    <Route path="/category/:name">
                        {p => <Categories {...p} Addbasket={(...k) => this.AddBasket(...k)} basket={this.state.basket} />}
                    </Route>
                    <Route path="/search/:name">
                        {p => <Search {...p} Addbasket={(...k) => this.AddBasket(...k)} basket={this.state.basket} />}
                    </Route>
                    <Route path="/details/:name" component={Details} />
                    <Route path="/" component={Home} />
                </Switch>
                <Card className="text-center mt-3">
                    <Card.Header>Borsok Cafe</Card.Header>
                    <Card.Body>
                        <Card.Title>© 2021 Все права защищены</Card.Title>
                        <Card.Text>
                            Proudly built in the Ru
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                </Card>
            </div>
        )
    }
}

