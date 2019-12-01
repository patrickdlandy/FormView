//This component will display a list of responses to a given form

import React from 'react';
import { Link } from 'react-router-dom';

class ResponseIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.state = {
      menuDisplayed: false,
      responsesLoaded: false,
      elementsLoaded: false,
      optionsLoaded: false,
      formLoaded: false
    }
  }

  componentDidMount() {
    const localContentChange = this.contentChange;
    this.props.fetchResponses().then(function() {
      localContentChange("responsesLoaded");
    });
    this.props.fetchElements().then(function() {
      localContentChange("elementsLoaded");
    });
    this.props.fetchOptions().then(function () {
      localContentChange("optionsLoaded");
    });
    this.props.fetchForm(this.props.formId).then(function () {
      localContentChange("formLoaded");
    });
  }

  componentWillUnmount() {
    this.props.clearResponses();
    this.props.clearElements();
    this.props.clearOptions();
    this.props.clearForms();
  }

  contentChange(key) {
    this.setState({
      [key]: true
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(function (state) {
      return ({
        menuDisplayed: !state.menuDisplayed
      });
    });
  }

  renderResponses() {
    //iterate through the responses one by one and add to a list of html elements
    //if they belong to the current form
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
            {this.props.formId}
          </div>
        </main>
      </div>
    )
  }
}


export default ResponseIndex;