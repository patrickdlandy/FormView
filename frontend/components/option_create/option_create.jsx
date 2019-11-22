import React from 'react';
import { Link, withRouter } from 'react-router-dom';

//Need to build up create and update for option, and then add delete for element and option

// id: bigint           
// title: string           
// element_id: integer          
// body: string           
// order: integer          
// option_type: string           

class OptionCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      body: "",
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
    this.props.createOption({ option: this.state }).then(() => {
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
          <h3>New Option</h3>
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
          <input type="submit" value="Create!" />
        </form>
      </div>
    )
  }

}

export default OptionCreate;