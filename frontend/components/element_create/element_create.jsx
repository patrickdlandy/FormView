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
      form_id: this.props.formId,
      element_type: "Multiple Choice"
    };
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  componentWillUnmount() {
    // this.props.clearElementErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    let myhistory = this.props.history;
    let id = this.props.formId;
    this.props.createElement({ element: this.state }).then(() => {
      myhistory.push(`/forms/${id}`);
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
          <h3>New Question</h3>
          <br />
          <label>Question Label:</label>
          <br />
          <input type="text" className="name-box" value={this.state.title} onChange={this.update("title")} />
          <br />
          {this.renderErrors()}
          <label>Question Body:</label>
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