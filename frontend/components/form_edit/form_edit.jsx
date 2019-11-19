import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ElementCreate from '../element_create/element_create';
import ElementEdit from '../element_edit/element_edit';

class FormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.state = {
            form: {
                id: this.props.formId,
                name: this.props.form.name,
                user_id: this.props.currentUser.id,
                description: this.props.form.description
            },
            menuDisplayed: false,
            elementsLoaded: false
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

    componentDidMount() {
        let contentChange = this.contentChange;
        this.props.fetchForm(this.props.formId);
        this.props.fetchElements().then(function () {
            contentChange("elementsLoaded")
        });
    }

    componentWillUnmount() {
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

    handleDelete(e) {
        e.preventDefault();
        let myhistory = this.props.history;
        this.props.deleteForm(this.props.form.id).then(() => {
            myhistory.push("/")
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let myhistory = this.props.history;
        this.props.updateForm({form: this.state.form}).then(() => {
            myhistory.push("/")
        });
    }

    renderErrors() {
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

    renderElementEdits() {
        let localFormId = this.props.formId;
        let localElements = this.props.elements;
        let localClearElementErrors = this.props.clearElementErrors;
        let localUpdateElement = this.props.updateElement;
        let localHistory = this.props.history;
        let localErrors = this.props.elementErrors;
        if (this.state.elementsLoaded) {
            debugger
            return (
                <div>
                    {this.props.form.element_ids.map( function(id) {
                        return (
                            <ElementEdit
                                key = {id}
                                id = {id} 
                                formId={localFormId}
                                title={localElements[id].title}
                                body={localElements[id].body}
                                clearElementErrors={localClearElementErrors} 
                                updateElement={localUpdateElement} 
                                history={localHistory} 
                                errors={localErrors}
                                />
                        )
                    })}
                </div>
            )
        }
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
            <div className="form-builder-container">
                <form onSubmit={this.handleSubmit}>
                    <h3>Edit Form</h3>
                    <br/>
                    <label>Name:</label>
                    <br/>
                    <input type="text" className="name-box" value={this.state.form.name} onChange={this.update("name")}/>
                    <br/>
                    {this.renderErrors()}
                    <label>Description!</label>
                    <br/>
                    <textarea className="description-box" type="text" value={this.state.form.description} onChange={this.update("description")}/>
                    <br/>
                    <input type="submit" value="Update!"/>
                </form>
                <button onClick={this.handleDelete}>Delete Form</button>
            </div>
            {this.renderElementEdits()}
            <ElementCreate formId={this.props.formId} clearElementErrors={this.props.clearElementErrors} createElement={this.props.createElement} history={this.props.history} errors={this.props.elementErrors}/>
        </div>
        );
    }
}

//Can pass props directly in to ElementCreate
//example <ElementCreate logout={this.props.logout} /> and then inside I can do this.props.logout

//I don't need a container for small components within a page.  Can pass in state, etc.

export default withRouter(FormEdit);