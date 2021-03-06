import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ElementCreate from '../element_create/element_create';
import OptionCreate from '../option_create/option_create';
import ElementEdit from '../element_edit/element_edit';
import OptionEdit from '../option_edit/option_edit';

class FormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.formReceived = this.formReceived.bind(this);
        this.renderOptionEdits = this.renderOptionEdits.bind(this);
        this.state = {
            form: {
                id: this.props.formId,
                name: this.props.form ? this.props.form.name : "",
                user_id: this.props.currentUser.id,
                description: this.props.form? this.props.form.description : ""
            },
            menuDisplayed: false,
            formLoaded: false,
            elementsLoaded: false,
            optionsLoaded: false
        };
    }

    update(field) {
        let prevState = this.state;
        let currentComponent = this;
        let form = Object.assign({}, prevState.form);
        return function(e) {
            form[field] = e.target.value;
            currentComponent.setState({ form });
        }
    }

    contentChange(key) {
        this.setState({
            [key]: true
        });
    }

    formReceived() {
        let form = this.props.form;
        this.setState({
            form: {
                id: this.props.form.id,
                name: form.name,
                user_id: this.props.currentUser.id,
                description: form.description
            }
        })
    }


    //Where am I clearing forms?????? I need to search my code to understand how 
    //the front end state is getting cleared.

    componentDidMount() {
        let contentChange = this.contentChange;
        let formReceived = this.formReceived;
        this.props.fetchForm(this.props.formId).then(function () {
            contentChange("formLoaded");
            formReceived();
        });
        this.props.fetchElements().then(function () {
            contentChange("elementsLoaded")
        });
        this.props.fetchOptions().then(function () {
            contentChange("optionsLoaded")
        });
    }

    componentWillUnmount() {
        this.props.clearFormErrors();
        this.props.clearOptionErrors();
        this.props.clearElementErrors();
        this.props.clearForms();
        this.props.clearElements();
        this.props.clearOptions();
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(function (state) {
            return ({
                menuDisplayed: !state.menuDisplayed
            });
        });
    }

    handleDelete(e) {
        e.preventDefault();
        let myhistory = this.props.history;
        let id = this.props.form.id;
        this.props.deleteForm(id).then(() => {
            myhistory.push(`/`);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let myhistory = this.props.history;
        let id = this.props.form.id;
        this.props.updateForm({form: this.state.form}).then(() => {
            myhistory.push(`/placeholder`);
            myhistory.push(`/edit/${id}`);
        });
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

    renderOptionEdits(elementId) {
        let localOptions = this.props.options;
        let localElement = this.props.elements[elementId];
        let localFormId = this.props.formId;
        let localClearOptionErrors = this.props.clearOptionErrors;
        let localUpdateOption = this.props.updateOption;
        let localDeleteOption = this.props.deleteOption;
        let localHistory = this.props.history;
        let localOptionErrors = this.props.optionErrors;
        if (localElement && this.state.optionsLoaded && Object.keys(localOptions).length > 0) {
            return (
                <div>
                    {localElement.option_ids.map(function(id, idx) {
                        return (
                            <div key={idx} className = "option-indent">
                            <OptionEdit
                                option = {localOptions[id]}
                                formId = {localFormId} 
                                clearOptionErrors = {localClearOptionErrors}
                                updateOption = {localUpdateOption}
                                deleteOption = {localDeleteOption}
                                history = {localHistory}
                                optionErrors = {localOptionErrors}
                                errors = {localOptionErrors}
                            />
                            </div>
                        )
                    })}
                </div>
            )
        }

    }

    renderElementEdits() {
        let localFormId = this.props.formId;
        let localForm = this.props.form;
        let localElements = this.props.elements;
        let localClearElementErrors = this.props.clearElementErrors;
        let localUpdateElement = this.props.updateElement;
        let localDeleteElement = this.props.deleteElement;
        let localHistory = this.props.history;
        let localElementErrors = this.props.elementErrors;
        let localClearOptionErrors = this.props.clearOptionErrors;
        let localCreateOption = this.props.createOption;
        let localOptionErrors = this.props.optionErrors;
        let localRenderOptionEdits = this.renderOptionEdits;
        if (this.state.formLoaded && localForm && this.state.elementsLoaded && Object.keys(localElements).length > 0) {
            return (
                <div>
                    {localForm.element_ids.map( function(id, idx) {
                        return (
                            <div key={idx} className = "element-indent">
                                <ElementEdit
                                    key={id + Math.floor(Math.random() * 1000)}
                                    id = {id} 
                                    formId={localFormId}
                                    title={localElements[id].title}
                                    body={localElements[id].body}
                                    clearElementErrors={localClearElementErrors}
                                    deleteElement={localDeleteElement} 
                                    updateElement={localUpdateElement} 
                                    history={localHistory} 
                                    errors={localElementErrors}
                                    />
                                {localRenderOptionEdits(id)}
                                <div className = "element-indent">
                                    <OptionCreate
                                        key = {-1}
                                        elementId = {id}
                                        formId = {localFormId}
                                        clearOptionErrors={localClearOptionErrors}
                                        createOption={localCreateOption}
                                        history={localHistory}
                                        errors={localOptionErrors}
                                        />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
    
    render() {
        if (!this.props.form) {
            return(
                <div></div> 
            );
        }
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
            <div className="form-builder-container">
                <form onSubmit={this.handleSubmit}>
                    <h3>Edit Form</h3>
                    <br/>
                    <label>Name:</label>
                    <br/>
                    <input type="text" className="name-box" value={this.state.form.name} onChange={this.update("name")}/>
                    <br/>
                    {this.renderErrors()}
                    <label>Description:</label>
                    <br/>
                    <textarea className="description-box" type="text" value={this.state.form.description} onChange={this.update("description")}/>
                    <br/>
                    <div className="form-builder-button-container">
                        <input type="submit" value="Update!"/>
                        <Link to={`/forms/${this.props.formId}`}> View Form </Link>
                        <button onClick={this.handleDelete}>Delete Form</button>
                    </div>
                </form>
                <br />
            </div>
            {this.renderElementEdits()}
            <div className="element-indent">
                <ElementCreate
                    key={-1} 
                    formId={this.props.formId} 
                    clearElementErrors={this.props.clearElementErrors} 
                    createElement={this.props.createElement} 
                    history={this.props.history} 
                    errors={this.props.elementErrors}/>
            </div>
        </div>
        );
    }
}

//Can pass props directly in to ElementCreate
//example <ElementCreate logout={this.props.logout} /> and then inside I can do this.props.logout

//I don't need a container for small components within a page.  Can pass in state, etc.

export default withRouter(FormEdit);