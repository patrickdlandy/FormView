import React from 'react';
import { Link } from 'react-router-dom';

class FormShow extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            menuDisplayed: false
        }
    }

    componentDidMount() {
        this.props.fetchForm(this.props.formId);
        this.props.fetchElements();
    }

    componentWillUnmount() {
        this.props.clearElements();
        console.log(this.props.elements);
    }

    renderForm() {
        if (this.props.form) {
            return(
                <div className="form-show-container">
                    {this.props.form.name}
                    <br/>
                    {this.props.form.description}
                    <br/>
                    <br/>
                    <h1>Sample Question:</h1>
                    <br/>
                    <div className="question-container">
                        <h3>Select from the choices below:</h3>
                        <div>
                            <input id="optionB" type="radio" className="radio-button" value="A"/>
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
    }

    renderElements() {
        const local_elements = this.props.elements;
         if (Object.keys(local_elements).length > 0 && this.props.form) {
             console.log(this.props.form.element_ids);
             return (this.props.form.element_ids.map(function (id, i) {
                 let body = local_elements[id].body;
                 console.log(body);
                 return (
                     <div key={i} className="question-container">
                         <h3>{body}</h3>
                     </div>
                 );
             })); 
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
                <main className="bottom-container">
                    <div>
                        {this.renderForm()}
                        {this.renderElements()}
                    </div>
                </main>
            </div>
        );
    }
}

export default FormShow;