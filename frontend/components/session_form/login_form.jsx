import React from 'react';
import { Link } from 'react-router-dom';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
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

    componentWillUnmount() {
        // debugger
        this.props.clearErrors();
    }

    renderErrors() {
        //console.log(this.props.errors);
        return (
            <ul>
                {this.props.errors.map(function (error, i) {
                    return(
                    <li className="error" key={`error-${i}`}>
                        {error}
                    </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <div className="main-nav-container">
                    <Link to="/" className="nav-element-logo-link">
                        <img className="logo" src={window.logo} alt="" />
                    </Link>
                </div>
                <form className="bottom-container" onSubmit={this.handleSubmit}>
                    <br/>
                    <h1 className="general-sub-header">Welcome to FormView!</h1>
                    <h3 className="general-sub-header">log in</h3>
                    <div className="login-form-container">
                        <br />
                        <br/>
                        <input type="text"
                            className="login-text-box"
                            required 
                            placeholder="USERNAME"
                            value={this.state.username}
                            onChange={this.update('username')}
                        />
                        <br />
                        <br/>
                        {this.renderErrors()}
                        <br/>
                        <input type="password"
                        className="login-text-box"
                            required 
                            value={this.state.password}
                            placeholder="PASSWORD"
                            onChange={this.update('password')}
                        />
                        <br/>
                        <br />
                        <input className="login-page-button" type="submit" value="LOGIN" />
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;