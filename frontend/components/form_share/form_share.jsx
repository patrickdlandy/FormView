import React from 'react';
import { Link } from 'react-router-dom';

class FormShare extends React.Component {
  constructor(props) {
    super(props);
    this.fetchElements = this.fetchElements.bind(this);
    this.state = {
      submitted: false,
      elementIds: []
    }
  }
  
  // update(field) {
  //   return e => this.setState({
  //     [field]: e.currentTarget.value
  //   })
  // }

  fetchElements() {
    const localElementIds = this.props.form.element_ids;
    const localFetchElement = this.props.fetchElement;
    localElementIds.forEach(function(id) {
      console.log(id);
      localFetchElement(id);
    });
  }

  componentDidMount() {
    const localfetchElements = this.fetchElements;
    this.props.fetchForm(this.props.formId).then( function() {
      localfetchElements();
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