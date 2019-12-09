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
      element_ids: false,
      option_ids: false
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
    const localContentChange = this.contentChange;
    const localFetchOptions = this.fetchOptions;
    localElementIds.forEach(function(id, idx) {
      console.log(idx);
      //all promises need to resolve before localFetchOptions() is called.
      //how can I set this up? Local State?
      localFetchElement(id).then(() => {
        console.log(localElementIds);
        console.log(idx);
        console.log(localElementIds.length);
        //how can I fetch the options for this element only?
        //maybe i can write a method that accepts an element id
        //and fetches options based on the option ids in local state.
        localFetchOptions(id);
      });
    });
  }

  fetchOptions(element_id) {
    //this method fetches the options associated with an element in local state
    const localFetchOption = this.props.fetchOption;
    const localElement = this.props.elements[element_id];
    localElement.option_ids.forEach(function(option_id, idx) {
      localFetchOption(option_id);
    })
   
  }

  componentDidMount() {
    const localContentChange = this.contentChange;
    const localFetchElements = this.fetchElements;
    this.props.fetchForm(this.props.formId).then( function() {
      console.log("Form Fetched!");
      localContentChange("formLoaded");
      localFetchElements();
    });
  }

  componentDidUpdate() {
    //need to deal with fetching options here once elements are loaded
    // console.log('update');
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