import React, { Component } from 'react'
import axios from 'axios'

export default class Telegram extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputText: '',
        }

    }

    Send = () => {
        if (this.state.inputText === '') {
            alert ('noo')
        } else {
            axios.get('https://api.telegram.org/bot5916982453:AAEmsgcIJ7F0rrEKYsfe2JWQOSTvDfBiNhI/sendMessage', {
                params: {
                    chat_id: '868287401',
                    text: this.state.inputText
                }
            })
                .then((data) => {
                    console.log('ok');
                });
            this.setState({
                inputText: ''
            })
        }
    }

    render() {
        return (
            <div className="text-center mt-5">
                <input type="text" value={this.state.inputText} onChange={e => this.setState({ inputText: e.target.value })} />
                <button onClick={this.Send}>Send text</button>
            </div>
        )
    }
}
