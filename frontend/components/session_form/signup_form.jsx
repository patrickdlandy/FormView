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
                    <Link to="/" className="nav-element-logo-link">
                        <img className="logo" src={window.logo} alt="" />
                    </Link>
                    <ul className="nav-ul">
                        <li className="nav-element">
                            <a href="https://github.com/patrickdlandy/FormView" className="nav-link" target="_blank">GITHUB</a>
                        </li>
                        <li className="nav-element">
                            <a href="https://www.linkedin.com/in/patrick-d-landy-pe-178a279a//" className="nav-link" target="_blank">LINKEDIN</a>
                        </li>
                        <li className="nav-element">
                            <a href="https://angel.co/patrick-d-landy" className="nav-link" target="_blank">ANGELLIST</a>
                        </li>
                    </ul>
                    <Link to="/login"
                        className="login-link"
                    >LOGIN</Link>
                </nav>
                <form className="bottom-container" onSubmit={this.handleSubmit}>
                    <h2>Create powerful forms today.</h2>
                    <br/>
                    <div className="login-form-container">
                        <br/>
                        <label>Username:
                            <br/>
                            <input type="text"
                                className="login-text-box"
                                required 
                                value={this.state.username}
                                onChange={this.update('username')}
                            />
                        </label>
                        <br/>
                        {this.renderErrors()}
                        <br/>
                        <label>Email Address:
                            <br/>
                            <input type="text"
                                className="login-text-box"
                                required
                                type='email' 
                                value={this.state.email}
                                onChange={this.update('email')}
                            />
                        </label>
                        <br />
                        <br/>
                        <label>Password:
                            <br/>
                            <input type="password"
                                className="login-text-box"
                                required
                                value={this.state.password}
                                onChange={this.update('password')}
                            />
                        </label>
                        <br />
                        <br/>
                        <input type="submit" className="login-page-button" value="SIGN UP" />
                    </div>
                </form>
            </div>
        );
    }
}

export default SignupForm;