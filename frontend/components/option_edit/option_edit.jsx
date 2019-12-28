import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// id: bigint           
// title: string           
// element_id: integer          
// body: string           
// order: integer          
// option_type: string           

class OptionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      id: this.props.option.id,
      title: this.props.option.title,
      body: this.props.option.body,
      order: 1,
      element_id: this.props.elementId,
      option_type: "Multiple Choice"
    };
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  componentWillUnmount() {
    // this.props.clearOptionErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    let myhistory = this.props.history;
    let id = this.props.formId;
    this.props.updateOption({ option: this.state }).then(() => {
      myhistory.push(`/`);
      myhistory.push(`/edit/${id}`);
    });
  }

  handleDelete(e) {
    e.preventDefault();
    let myhistory = this.props.history;
    let id = this.props.formId;
    this.props.deleteOption(this.props.option).then(() => {
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
          <h3>Edit Option</h3>
          <br />
          <label>Option Label:</label>
          <br />
          <input type="text" className="name-box" value={this.state.title} onChange={this.update("title")} />
          <br />
          {this.renderErrors()}
          <label>Option Body:</label>
          <br />
          <textarea className="description-box" type="text" value={this.state.body} onChange={this.update("body")} />
          <br />
          <div className="form-builder-button-container">
            <input type="submit" value="Update!" />
            <button onClick={this.handleDelete}>Delete Option</button>
          </div>
        </form>
      </div>
    )
  }
}

export default OptionEdit;