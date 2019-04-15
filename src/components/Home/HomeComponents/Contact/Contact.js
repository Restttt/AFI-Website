import React, {Component} from 'react';

import './Contact.scss';

class Contact extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:  '',
            email: '',
            number: '',
            message: ''
        };
    };

    updateEvent = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    sendMessage = () => {
        const message = {
            name: this.state.name,
            email: this.state.email,
            number: this.state.number,
            message: this.state.message
        };
        console.log(message);
    };

    render() {
        return(
            <div className="contact-us-parent-box">

                <div className="contact-forms-box">
                    <h1 className="contact-title">CONTACT US</h1>
                    <div className="contact-input-fields">
                        <input name="name" placeholder="Name" onChange={this.updateEvent} value={this.state.name} className="input-name"></input>
                        <input name="email" placeholder="Email" onChange={this.updateEvent} value={this.state.email} className="input-email"></input>
                        <input name="number" placeholder="Number" onChange={this.updateEvent} value={this.state.number} className="input-number"></input>
                        <input name="message" placeholder="Message" onChange={this.updateEvent} value={this.state.message} className="input-message"></input>
                    </div>
                    <button onClick={() => this.sendMessage()}className="contact-submit-button">Send</button>
                </div>

            </div>
        );
    };
};

export default Contact;