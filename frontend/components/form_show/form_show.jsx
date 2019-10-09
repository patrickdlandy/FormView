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

    render() {
        // console.log(this.props);
        if (this.props.currentUser) {
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
                                <h2>{this.props.currentUser.username + " "}&#x25BC;</h2>
                            </li>
                            <ul className="dropdown">
                                <li>
                                    <Link to="/" className="dropdown-link-item" onClick={this.props.logout}>Log Out</Link>
                                </li>
                                <li>
                                    <a href="https://github.com/patrickdlandy" className="dropdown-link-item" target="_blank">Github</a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="dropdown-link-tem" target="_blank">LinkedIn</a>
                                </li>
                            </ul>
                        </ul>
                    </nav>
                    <main className="bottom-container">
                        <div>
                            <h1 className="general-sub-header">Form Page</h1>
                        </div>
                    </main>
                </div>
            );
        } else {
            return (
                <Redirect to="/" />
            )
        }
    }

}

export default FormShow;