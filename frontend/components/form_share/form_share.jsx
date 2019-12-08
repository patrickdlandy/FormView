import React from 'react';
import { Link } from 'react-router-dom';

class FormShare extends React.Component {
  constructor(props) {
    super(props);
    this.fetchElements = this.fetchElements.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.state = {
      submitted: false,
      formLoaded: false,
      elementsLoaded: false,
      optionsLoaded: false,
    }
  }

  contentChange(key) {
    this.setState({
      [key]: true
    });
  }

  fetchElements() {
    const localElementIds = this.props.form.element_ids;
    const localFetchElement = this.props.fetchElement;
    localElementIds.forEach(function(id) {
      localFetchElement(id);
    });
  }

  fetchOptions(option_ids) {
    const localFetchOption = this.props.fetchOptions;
    option_ids.forEach(function(id) {
      console.log(id);
      localFetchOption(id);
    })
  }

  componentDidMount() {
    const localContentChange = this.contentChange;
    const localFetchElements = this.fetchElements;
    this.props.fetchForm(this.props.formId).then( function() {
      console.log("Form Fetched!");
      localContentChange("formLoaded");
      localFetchElements();
    }).then(function () {
      console.log('Elements Fetched!');
    });
  }

  componentDidUpdate() {
    //need to deal with fetching options here once elements are loaded
    console.log('update');
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

  renderForm() {
    if (this.props.form) {
      return (
        <div className="form-show-container">
          <h2>{this.props.form.name}</h2>
          <br />
          {this.props.form.description}
          <br />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="main-nav-container">
          <Link to="/" className="nav-element-logo-link">
            <img className="logo" src={window.logo} alt="" />
          </Link>
        </div>
        <main className="bottom-container">
          <div>
            {this.renderForm()}
          </div>
        </main>
      </div>
    )
  }

}

export default FormShare;