import React from 'react';
import { Link } from 'react-router-dom';

class FormCreate extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
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
                            <Link to="/" className="dropdown-link-item">Your Forms</Link>
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
            <h1>Form Builder</h1>
        </div>
        );
    }
}

export default FormCreate;