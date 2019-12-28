import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ElementEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      body: this.props.body,
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
    this.props.updateElement({ element: this.state }).then(() => {
      myhistory.push(`/`);
      myhistory.push(`/edit/${id}`);
    });
  }

  handleDelete(e) {
    e.preventDefault();
    let myhistory = this.props.history;
    let id = this.props.formId;
    this.props.deleteElement(this.props.id).then(() => {
      myhistory.push(`/`);
      myhistory.push(`/edit/${id}`);
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
          <h3>Edit Question</h3>
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
          <div className="form-builder-button-container">
            <input type="submit" value="Update!" />
            <button onClick={this.handleDelete}>Delete Question</button>
          </div>
        </form>
      </div>
    )
  }

}

export default ElementEdit;