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

    renderErrors() {
        //console.log(this.props.errors);
        return (
            <ul>
                {this.props.errors.map(function (error, i) {
                    return(
                    <li key={`error-${i}`}>
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
                    <ul className="nav-element">
                        <Link to="/" className="nav-element-logo-link">FormView by Patrick Landy</Link>
                    </ul>
                </div>
                <form className="bottom-container" onSubmit={this.handleSubmit}>
                    <h2 className="general-sub-header">Welcome to FormView</h2>
                    {this.renderErrors()}
                    <div>
                        <br />
                        <label>Username:
                            <input type="text"
                                required 
                                value={this.state.username}
                                onChange={this.update('username')}
                            />
                        </label>
                        <br />
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

export default LoginForm;