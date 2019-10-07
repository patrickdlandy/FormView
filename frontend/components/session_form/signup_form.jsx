import React from 'react';
import { Link } from 'react-router-dom';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map(function (error, i) {
                    return(
                    <li className="error" key={`error-${i}`}>
                        {error}
                    </li>
                    )
                })}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <nav className="main-nav-container">
                    <ul className="nav-element">
                        <Link to="/" className="nav-element-logo-link">FormView by Patrick Landy</Link>
                    </ul>
                    <ul className="nav-ul">
                        <li className="nav-element">
                            <a href="https://github.com/patrickdlandy" className="nav-link">GITHUB</a>
                        </li>
                        <li className="nav-element">
                            <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="nav-link">LINKEDIN</a>
                        </li>
                    </ul>
                    <Link to="/login"
                        className="login-link"
                    >LOGIN</Link>
                </nav>
                <form className="bottom-container" onSubmit={this.handleSubmit}>
                    <h2>Create powerful forms today.</h2>
                    <div>
                        <br />
                        <label>Username:
                            <input type="text"
                                required 
                                value={this.state.username}
                                onChange={this.update('username')}
                            />
                        </label>
                        <br/>
                        {this.renderErrors()}
                        <br/>
                        <label>Email Address:
                            <input type="text"
                                required
                                type='email' 
                                value={this.state.email}
                                onChange={this.update('email')}
                            />
                        </label>
                        <br />
                        <br/>
                        <label>Password:
                            <input type="password"
                                required
                                value={this.state.password}
                                onChange={this.update('password')}
                            />
                        </label>
                        <br />
                        <input type="submit" value={this.props.formType} />
                    </div>
                </form>
            </div>
        );
    }
}

export default SignupForm;