import React from 'react';
import { Link, Redirect } from 'react-router-dom';
// import {
//     Route,
//     Redirect,
//     Switch,
//     Link,
//     HashRouter
// } from 'react-router-dom';

class FormShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchForm(this.props.formId);
    }

    renderForm() {
        if (this.props.form) {
            return(
                <div className="form-show-container">
                    {this.props.form.name}
                    <br/>
                    {this.props.form.description}
                    <br/>
                    <br/>
                    <h1>Sample Question:</h1>
                    <br/>
                    <div className="question-container">
                        <h3>Select from the choices below:</h3>
                        <div>
                            <input id="optionB" type="radio" className="radio-button" value="A"/>
                            <label htmlFor="optionB"> Option A</label>
                        </div>
                        <div>
                            <input id="optionB" type="radio" className="radio-button" value="B" />
                            <label htmlFor="optionB"> Option B</label>
                        </div>
                        <div>
                            <input id="optionB" type="radio" className="radio-button" value="C" />
                            <label htmlFor="optionB"> Option C</label>
                        </div>
                        <div>
                            <input id="optionB" type="radio" className="radio-button" value="D" />
                            <label htmlFor="optionB"> Option D</label>
                        </div>

                    </div>
                </div>
            );
        }
    }

    render() {
        // console.log(this.props);
        return(
            <div>
                <nav className="main-nav-container">
                    <h1 className="nav-element">FormView by Patrick Landy</h1>
                    <ul className="nav-ul">
                        <li className="nav-element">
                            <a href="https://github.com/patrickdlandy" className="nav-link" target="_blank">GITHUB</a>
                        </li>
                        <li className="nav-element">
                            <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="nav-link" target="_blank">LINKEDIN</a>
                        </li>
                    </ul>
                    <ul className="username-link">
                        <li>
                            <h2>{this.props.currentUser.username + " ⌄"}</h2>
                        </li>
                        <ul className="dropdown">
                            <li className="dropdown-item-background">
                                <Link to="/" className="dropdown-link-item" onClick={this.props.logout}>Log Out</Link>
                            </li>
                            <li className="dropdown-item-background">
                                <Link to="/" className="dropdown-link-item">Your Forms</Link>
                            </li>
                            <li className="dropdown-item-background">
                                <a href="https://github.com/patrickdlandy" className="dropdown-link-item" target="_blank">Github</a>
                            </li>
                            <li className="dropdown-item-background">
                                <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="dropdown-link-item" target="_blank">LinkedIn</a>
                            </li>
                        </ul>
                    </ul>
                </nav>
                <main className="bottom-container">
                    <div>
                        {this.renderForm()}
                    </div>
                </main>
            </div>
        );
    }
}

export default FormShow;