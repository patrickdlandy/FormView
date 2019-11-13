import React from 'react';
import { Link } from 'react-router-dom';

class FormShow extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderElements = this.renderElements.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.state = {
            menuDisplayed: false
        }
    }

    componentDidMount() {
        this.props.fetchForm(this.props.formId);
        this.props.fetchElements();
        this.props.fetchOptions();
    }

    componentWillUnmount() {
        this.props.clearElements();
        this.props.clearOptions();
    }

    renderForm() {
        //Getting the elements and options might make sense here instead of in nested functions.
        if (this.props.form) {
            return(
                <div className="form-show-container">
                    <h2>{this.props.form.name}</h2>
                    <br/>
                    {this.props.form.description}
                    <br/>
                    <br/>
                    {this.renderElements()}
                    <br/>
                </div>
            );
        }
    }

    renderOptions(element_id) {
        const local_options = this.props.options;
        return (this.props.elements[element_id].option_ids.map(function (id, i) {
            return (
                <div key={i} >
                    <h3>{local_options[id].title}</h3>
                </div>
            );
        }));
    }

    renderElements() {
        const local_elements = this.props.elements;
        const local_options = this.props.options;
        if (this.props.form) {
            if (this.props.form.element_ids.length === 0) {
                return (
                    <div>
                        <h1>Sample Question:</h1>
                        <br />
                        <div className="question-container">
                            <h3>Select from the choices below:</h3>
                            <div>
                                <input id="optionB" type="radio" className="radio-button" value="A" />
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
            if (Object.keys(local_elements).length > 0 && Object.keys(local_options).length > 0) {
                let element_arr = this.props.form.element_ids.map(function (id1) {
                    let local_option_arr = local_elements[id1].option_ids.map(function(id) {
                        // debugger
                        return(
                            <div key={id}>
                                <span>
                                    {local_options[id].title + ": " + local_options[id].body}
                                </span>
                            </div>
                        );
                    });
                    return (
                        <div key={id1} className="question-container">
                            <h3>{local_elements[id1].title}:</h3>
                            <h3>{local_elements[id1].body}</h3>
                            {local_option_arr}
                            <br/>
                        </div>
                    );
                });
                console.log(element_arr);
                return element_arr;
            }
        }
    }

   

    handleClick(e) {
        e.preventDefault();
        this.setState(function (state) {
            return ({
                menuDisplayed: !state.menuDisplayed
            });
        });
    }

    render() {
        return(
            <div>
                <nav className="main-nav-container">
                    <img className="logo" src={window.logo} alt="" />
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