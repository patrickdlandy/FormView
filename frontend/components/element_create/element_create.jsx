import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ElementCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      body: "",
      order: 1,
      form_id: this.props.formId
    };
    debugger
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  componentWillUnmount() {
    this.props.clearElementErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    let myhistory = this.props.history;
    debugger
    this.props.createElement({ element: this.state }).then(() => {
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

  render() {
    return (
      <div className="form-builder-container">
        <form onSubmit={this.handleSubmit}>
          <h3>New Element</h3>
          <br />
          <label>Option (A, B, C, etc):</label>
          <br />
          <input type="text" className="name-box" value={this.state.title} onChange={this.update("title")} />
          <br />
          <label>Description:</label>
          <br />
          <textarea className="description-box" type="text" value={this.state.body} onChange={this.update("body")} />
          <br />
          <input type="submit" value="Create!" />
        </form>
      </div>
    )
  }

}

export default ElementCreate;