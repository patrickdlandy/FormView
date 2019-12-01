import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class FormShow extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderElements = this.renderElements.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.handleRadioSelection = this.handleRadioSelection.bind(this);
        this.responseChange = this.responseChange.bind(this);
        this.elementsToState = this.elementsToState.bind(this);
        this.getResponses = this.getResponses.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIncompleteSubmit = this.handleIncompleteSubmit.bind(this);
        this.state = {
            menuDisplayed: false,
            elementsLoaded: false,
            optionsLoaded: false,
            responses: {}
        }
    }

    contentChange(key) {
        this.setState({
               [key]: true
            });
    }

    responseChange(elementId, optionId) {
        // console.log(this.state.responses);
        this.props.clearResponseErrors();

        this.setState(function(prevState) {
            return Object.assign({}, prevState, { responses: {
                ...prevState.responses,
                [elementId]: optionId
            }})
        }, function () {
            console.log(this.state.responses);
        });
    }

    elementsToState() {
        const localResponseChange = this.responseChange;
        const localForm = this.props.form;
        console.log(localForm.element_ids);
        Object.keys(this.props.elements).forEach(function(ele) {
            console.log(ele);
            console.log(localForm.element_ids.includes(ele));
            if (localForm.element_ids.includes(ele)) {
            localResponseChange(ele, null);
            }
        });
        // console.log(this.state.responses);
    }

    componentDidMount() {
        const contentChange = this.contentChange;
        const localElementsToState = this.elementsToState;
        this.props.fetchForm(this.props.formId);
        this.props.fetchElements().then(function () {
            contentChange("elementsLoaded");
            localElementsToState();
        });
        this.props.fetchOptions().then(function() {
            contentChange("optionsLoaded")
        });
    }

    getResponses() {
        return this.state.responses;
    }

    componentWillUnmount() {
        this.props.clearElements();
        this.props.clearOptions();
        this.props.clearResponseErrors();
    }

    renderForm() {
        if (this.props.form && this.state.optionsLoaded === true && this.state.elementsLoaded === true ) {
            return(
                <div className="form-show-container">
                    <h2>{this.props.form.name}</h2>
                    <br/>
                    {this.props.form.description}
                    <br/>
                    <br/>
                    {this.renderElements(this.props.elements, this.props.options)}
                    {this.renderErrors()}
                    <br/>
                    <Link to={`/edit/${this.props.form.id}`}>Edit Form</Link>
                    <br/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            );
        }
    }

    renderOptions(element_id) {
        const local_options = this.props.options;
        return (this.props.elements[element_id].option_ids.map(function (id, i) {
            return (
                <div key={i} name={element_id}>
                    <h3>{local_options[id].title}</h3>
                </div>
            );
        }));
    }

    renderElements(elements, options) {
        const local_elements = elements;
        const local_options = options;
        const local_form = this.props.form;
        const local_responses = this.state.responses;
        const localHandleRadioSelection = this.handleRadioSelection;
        const localGetResponses = this.getResponses;
        if (this.props.form) {
            if (this.props.form.element_ids.length === 0) {
                return (
                    <div>
                        <h1>Sample Question:</h1>
                        <br />
                        <div className="question-container">
                            <h3>Select from the choices below:</h3>
                            <div>
                                <input name="optionB" type="radio" className="radio-button"/>
                                <label> Option A</label>
                            </div>
                            <div>
                                <input name="optionB" type="radio" className="radio-button" />
                                <label> Option B</label>
                            </div>
                            <div>
                                <input name="optionB" type="radio" className="radio-button" />
                                <label> Option C</label>
                            </div>
                            <div>
                                <input name="optionB" type="radio" className="radio-button" />
                                <label> Option D</label>
                            </div>
                        </div>
                    </div>
                );
            }
            //I need to deal with these situations now.
            //1. Checking to see if every element has an option selected and showing an error if not
            //2. Creating and clearing errors
            //3. (also need to put forms back on a protected route and plan a separate form taking mechanism).
            //4. Also need to rexamine error clearing (something isn't clearing errors correctly).
            if (Object.keys(local_elements).length > 0 && Object.keys(local_options).length > 0) {
                let element_arr = local_form.element_ids.map(function (id1) {
                    let local_option_arr = local_elements[id1].option_ids.map(function(id) {
                        return(
                            <div key={id}>
                                <span>
                                    <input 
                                    type="radio" 
                                    className="radio-button" 
                                    name={id1} 
                                    checked={localGetResponses()[id1] === id.toString()} 
                                    value={id}
                                    onChange={localHandleRadioSelection(id1, id)} />
                                    <label> 
                                        {" " + local_options[id].title + ": " + local_options[id].body}
                                    </label>
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

    handleRadioSelection(questionId, optionId) {
        const localResponseChange = this.responseChange;
        // this.props.clearResponseErrors();
        return function(e) {
            localResponseChange(questionId, e.target.value);
        }
    }

    handleIncompleteSubmit() {
        this.props.receiveResponseErrors(['All questions require a selected option.'])
        // console.log('INCOMPLETE');
    }

    handleSubmit(e) {
        e.preventDefault;
        const localGetResponses = this.getResponses;
        const localElements = this.props.elements;
        const localCreateResponse = this.props.createResponse;
        const localHandleIncompleteSubmit = this.handleIncompleteSubmit;
        const myhistory = this.props.history;
        this.props.clearResponseErrors();
        debugger
        console.log(localGetResponses());
        debugger
        if (Object.values(localGetResponses()).includes(null)) {
            debugger
            localHandleIncompleteSubmit();
        } else { 
            debugger
            Object.keys(localGetResponses()).forEach(function(id) {
                if (localGetResponses()[id] !== null && localElements[id].option_ids.length > 0) {
                    console.log(localGetResponses());
                    localCreateResponse({
                        response: {
                            option_id: parseInt(localGetResponses()[id], 10),
                            identifier: ""
                        }
                    });
                }
            });
            myhistory.push('/');
        }
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map(function (error, i) {
                    return (
                        <li className="error" key={i}>
                            {error}
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        let username = (this.props.currentUser ? this.props.currentUser.username : "responder")
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
                            <h2>{username + " ⌄"}</h2>
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