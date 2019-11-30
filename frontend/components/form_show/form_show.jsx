import React from 'react';
import { Link } from 'react-router-dom';

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
        Object.keys(this.props.elements).forEach(function(ele) {
            localResponseChange(ele, null);
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
                    <br/>
                    <Link to={`/edit/${this.props.form.id}`}>Edit Form</Link>
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
                // console.log(element_arr);
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

    // updateSelection(questionId, optionId) {
    //     this.setState(function() {
    //         return({
    //         responses: {
    //             [questionId]: optionId
    //         }});
    //     }, function() {
    //         console.log(this.state.responses);
    //     });
    //     console.log(questionId);
    //     console.log(optionId);
    // }

    handleRadioSelection(questionId, optionId) {
        // const localUpdateSelection = this.updateSelection;
        const localResponseChange = this.responseChange;
        return function(e) {
            localResponseChange(questionId, e.target.value);
        }
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