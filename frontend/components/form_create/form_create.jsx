import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

class FormCreate extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            user_id: this.props.currentUser.id,
            description: "",
            menuDisplayed: false
        };
    }

    update(field) {
        return (e) => this.setState({
                [field]: e.target.value
        });
    }

    componentWillUnmount() {
        // debugger
        this.props.clearFormErrors();
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(function (state) {
            return ({
                menuDisplayed: !state.menuDisplayed
            });
        });
    }

    navToShow() {
        const url = '/';
        this.props.history.push(url);
    }

    handleSubmit(e) {
        e.preventDefault();
        // debugger
        let myhistory = this.props.history;
        this.props.createForm({form: this.state}).then(() => {
            // debugger
            myhistory.push("/")
        });
        //this.navToShow()
    }

    //display or hide dropdown
    //onClick

    //find dropdown element by id
    //toggle class back and forth on click

    renderErrors() {
        //console.log(this.props.errors);
        return (
            <ul>
                {this.props.errors.map(function (error, i) {
                    return (
                        <li className="error" key={`error-${i}`}>
                            {error}
                        </li>
                    );
                })}
            </ul>
        );
    }
    
    render() {
        return(
        <div>
            <nav className="main-nav-container">
                <img className="logo" src={window.logo} alt="" />
                <ul className="nav-ul">
                    <li className="nav-element">
                        <a href="https://github.com/patrickdlandy" className="nav-link" target="_blank">GITHUB</a>
                    </li>
                    <li className="nav-element">
                        <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="nav-link" target="_blank">LINKEDIN</a>
                    </li>
                </ul>
                <ul className="username-link">
                        <li onClick={this.handleClick}>
                        <h2>{this.props.currentUser.username + " ⌄"}</h2>
                    </li>
                        <ul className={this.state.menuDisplayed ? "dropdown" : "dropdown-hidden"}>
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
            <div className="form-builder-container">
                <form onSubmit={this.handleSubmit}>
                    <h3>New Form</h3>
                    <br/>
                    <label>Name:</label>
                    <br/>
                    <input type="text" className="name-box" value={this.state.name} onChange={this.update("name")}/>
                    <br/>
                    {this.renderErrors()}
                    <label>Description:</label>
                    <br/>
                    <textarea className="description-box" type="text" value={this.state.description} onChange={this.update("description")}/>
                    <br/>
                    <input type="submit" value="Create!"/>
                </form>
            </div>
        </div>
        );
    }
}

export default withRouter(FormCreate);