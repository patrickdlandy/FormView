import React from 'react';
import { Link } from 'react-router-dom';

class FormShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    }
  }
  
  update(field) {
    return e => this.ListeningStateChangedEvent({
      [field]: e.currentTarget.value
    })
  }

  componentDidMount() {
    this.props.fetchForm(this.props.formId);
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

  render() {
    return (
      <div>
        <div className="main-nav-container">
          <Link to="/" className="nav-element-logo-link">
            <img className="logo" src={window.logo} alt="" />
          </Link>
        </div>
      </div>
    )
  }

}

export default FormShare;