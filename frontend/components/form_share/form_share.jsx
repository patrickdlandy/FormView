import React from 'react';
import { Link } from 'react-router-dom';

class FormShare extends React.Component {
  constructor(props) {
    super(props);
    this.fetchElements = this.fetchElements.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.optionTally = this.optionTally.bind(this);
    this.updateLoadedState = this.updateLoadedState.bind(this);
    this.elementsToState = this.elementsToState.bind(this);
    this.responseChange = this.responseChange.bind(this);
    this.getResponses = this.getResponses.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioSelection = this.handleRadioSelection.bind(this);
    this.handleIncompleteSubmit = this.handleIncompleteSubmit.bind(this);
    this.state = {
      submitted: false,
      formLoaded: false,
      elementsLoaded: false,
      optionsLoaded: false,
      responses: {}
    }
  }

  contentChange(key) {
    this.setState({
      [key]: true
    });
  }

  responseChange(elementId, optionId) {
    this.props.clearResponseErrors();
    this.setState(function (prevState) {
      return Object.assign({}, prevState, {
        responses: {
          ...prevState.responses,
          [elementId]: optionId
        }
      })
    }, function () {
      console.log(this.state.responses);
    });
  }

  elementsToState() {
    const localResponseChange = this.responseChange;
    const localForm = this.props.form;
    Object.keys(this.props.elements).forEach(function (ele) {
      if (localForm.element_ids.includes(parseInt(ele, 10))) {
        localResponseChange(ele, null);
      }
    });
  }

  optionTally() {
    let optionTally = 0;
    const localElements = this.props.elements;
    if (this.props.form &&
      (Object.keys(this.props.elements).length === this.props.form.element_ids.length)) {
      Object.keys(this.props.elements).forEach(function (elementId) {
        optionTally += localElements[elementId].option_ids.length;
      });
    }
    return optionTally;
  }

  updateLoadedState() {
    const localContentChange = this.contentChange;
    const localOptionTally = this.optionTally;
    if (this.props.form) {
      localContentChange("formLoaded");
    }
    if (this.props.form &&
      (Object.keys(this.props.elements).length === this.props.form.element_ids.length)) {
      localContentChange("elementsLoaded");
    }
    const tally = localOptionTally();
    if (this.props.form &&
      (Object.keys(this.props.elements).length === this.props.form.element_ids.length)
      && (Object.keys(this.props.options)).length === tally) {
      localContentChange("optionsLoaded");
    }
  }


  fetchElements() {
    const localElementIds = this.props.form.element_ids;
    const localFetchElement = this.props.fetchElement;
    const localFetchOptions = this.fetchOptions;
    const localElementsToState = this.elementsToState;
    localElementIds.forEach(function(id, idx) {
      localFetchElement(id).then(() => {
        localElementsToState();
        localFetchOptions(id);
      });
    });
  }

  fetchOptions(element_id) {
    const localFetchOption = this.props.fetchOption;
    const localElement = this.props.elements[element_id];
    const localUpdateLoadedState = this.updateLoadedState;
    localElement.option_ids.forEach(function(option_id) {
      localFetchOption(option_id).then(() => {
        localUpdateLoadedState()
      }
      );
    })
  }

  componentDidMount() {
    const localContentChange = this.contentChange;
    const localFetchElements = this.fetchElements;
    this.props.fetchForm(this.props.formId).then( function() {
      localContentChange("formLoaded");
      localFetchElements();
    });
  }

  componentWillUnmount() {
    this.props.clearElements();
    this.props.clearOptions();
    this.props.clearResponseErrors();
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

  getResponses() {
    return this.state.responses;
  }

  handleRadioSelection(questionId, optionId) {
    const localResponseChange = this.responseChange;
    return function (e) {
      localResponseChange(questionId, e.target.value);
    }
  }

  handleSubmit(e) {
    e.preventDefault;
    const localGetResponses = this.getResponses;
    const localElements = this.props.elements;
    const localCreateResponse = this.props.createResponse;
    const localHandleIncompleteSubmit = this.handleIncompleteSubmit;
    const myhistory = this.props.history;
    this.props.clearResponseErrors();
    if (Object.values(localGetResponses()).includes(null)) {
      localHandleIncompleteSubmit();
    } else {
      Object.keys(localGetResponses()).forEach(function (id) {
        if (localGetResponses()[id] !== null && localElements[id].option_ids.length > 0) {
          console.log(localGetResponses());
          localCreateResponse({
            response: {
              option_id: parseInt(localGetResponses()[id], 10),
              identifier: ""
            }
          });
        }
      });
      myhistory.push('/');
    }
  }

  handleIncompleteSubmit() {
    this.props.receiveResponseErrors(['All questions require a selected option.'])
    // console.log('INCOMPLETE');
  }

  renderElements(elements, options) {
    const local_elements = elements;
    const local_options = options;
    const local_form = this.props.form;
    const localGetResponses = this.getResponses;
    const localHandleRadioSelection = this.handleRadioSelection;
    let element_arr = local_form.element_ids.map(function (id1) {
      let local_option_arr = local_elements[id1].option_ids.map(function (id) {
        return (
          <div key={id}>
            <span>
              <input
                type="radio"
                className="radio-button"
                name={id1}
                checked={localGetResponses()[id1] === id.toString()}
                value={id}
                onChange={localHandleRadioSelection(id1, id)} />
              <label>
                {" " + local_options[id].title + ": " + local_options[id].body}
              </label>
            </span>
          </div>
        );
      });
      return (
        <div key={id1} className="question-container">
          <h3>{local_elements[id1].title}:</h3>
          <h3>{local_elements[id1].body}</h3>
          {local_option_arr}
          <br />
        </div>
      );
    });
    return element_arr;
  }

  renderForm() {
    if (this.state.formLoaded && this.state.elementsLoaded && this.state.optionsLoaded) {  
      return (
        <div className="form-show-container">
          <h2>{this.props.form.name}</h2>
          <br />
          {this.props.form.description}
          <br />
          <br/>
          {this.renderElements(this.props.elements, this.props.options)}
          {this.renderErrors()}
          <br/>
          <button onClick={this.handleSubmit}>Submit</button>
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