//This component will display a list of responses to a given form

import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

class ResponseIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.sortableTable = this.sortableTable.bind(this);
    this.state = {
      menuDisplayed: false,
      responsesLoaded: false,
      elementsLoaded: false,
      optionsLoaded: false,
      formLoaded: false
    }
  }

  componentDidMount() {
    const localContentChange = this.contentChange;
    this.props.fetchResponses().then(function() {
      localContentChange("responsesLoaded");
    });
    this.props.fetchElements().then(function() {
      localContentChange("elementsLoaded");
    });
    this.props.fetchOptions().then(function () {
      localContentChange("optionsLoaded");
    });
    this.props.fetchForm(this.props.formId).then(function () {
      localContentChange("formLoaded");
    });
  }

  componentWillUnmount() {
    this.props.clearResponses();
    this.props.clearElements();
    this.props.clearOptions();
    this.props.clearForms();
  }

  contentChange(key) {
    this.setState({
      [key]: true
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(function (state) {
      return ({
        menuDisplayed: !state.menuDisplayed
      });
    });
  }

  sortableTable(title, data, columns, defSort)  {
    return (<DataTable
      title={title}
      columns={columns}
      data={data}
      defaultSortField={defSort}
    />)
  }

  renderResponses() {
    if (this.state.formLoaded && this.state.elementsLoaded && this.state.optionsLoaded && this.state.responsesLoaded){
      const localForm = this.props.form;
      const localResponses = this.props.responses;
      const localOptions = this.props.options;
      const localElements = this.props.elements;
      const formEntries = [];
      const responseStats = {
          optionTotals: {}
      };
      const indexColumns = [
        {
          name: 'Question',
          selector: 'elementLabel',
          sortable: true,
        },
        {
          name: 'Question Body',
          selector: 'elementBody',
          sortable: false,
          grow: 2,
        },
        {
          name: 'Option',
          selector: 'optionLabel',
          sortable: true,
        },
        {
          name: 'Option Body',
          selector: 'optionBody',
          sortable: false,
        },
        {
          name: 'Timestamp',
          selector: 'timestamp',
          sortable: true,
        },
      ];
      const summaryColumns = [
        {
          name: 'Question',
          selector: 'elementLabel',
          sortable: true,
          grow: 1,
        },
        {
          name: 'Question Body',
          selector: 'elementBody',
          sortable: false,
          grow: 3,
        },
        {
          name: 'Option',
          selector: 'optionLabel',
          sortable: true,
          grow: 1,
        },
        {
          name: 'Option Body',
          selector: 'optionBody',
          sortable: false,
          grow: 1,
        },
        {
          name: 'Total Responses',
          selector: 'responseTotal',
          sortable: true,
          grow: 1,
        },
        {
          name: 'Response Percentage for this Question',
          selector: 'fractionOfTotal',
          sortable: true,
          grow: 1,
        }
      ];
      this.props.form.element_ids.forEach(function(elementId) {
        localElements[elementId].option_ids.forEach(function(optionId) {
          localOptions[optionId].response_ids.forEach(function(responseId) {
            responseStats["optionTotals"][elementId] = (responseStats["optionTotals"][elementId] || {});
            responseStats["optionTotals"][elementId][optionId] = ((responseStats["optionTotals"][elementId][optionId] + 1) || 1);
            formEntries.push({
              responseId: responseId,
              formTitle: localForm.name,
              timestamp: localResponses[responseId].created_at,
              elementLabel: localElements[elementId].title,
              elementBody: localElements[elementId].body,
              optionLabel: localOptions[optionId].title,
              optionBody: localOptions[optionId].body
            })
          })
        })
      })
      // const entryMap = formEntries.map(function(resp, idx) {
      //   return (
      //     <div key={idx}>
      //       Response ID: {resp["responseId"]} | Timestamp: {resp["timestamp"]} | Question: {resp["elementLabel"]} | Option: {resp["optionLabel"]}
      //     </div>
      //   )
      // })
      const formTotals = [];
      Object.keys(responseStats["optionTotals"]).forEach(function(elementId, idx) {
        // let numOptions = Object.keys(localElements[elementId].option_ids).length;
        let tally = 0;
        localElements[elementId].option_ids.forEach(function (optionId) {
          if (responseStats["optionTotals"][elementId][optionId]) {
            tally += responseStats["optionTotals"][elementId][optionId];
          }
        });
        console.log(tally);
        localElements[elementId].option_ids.forEach(function(optionId){
          formTotals.push({
            elementLabel: localElements[elementId].title,
            elementBody: localElements[elementId].body,
            optionLabel: localOptions[optionId].title,
            optionBody: localOptions[optionId].body,
            responseTotal: responseStats["optionTotals"][elementId][optionId],
            fractionOfTotal: !responseStats["optionTotals"][elementId][optionId] ? "0%" : (Math.floor(responseStats["optionTotals"][elementId][optionId]/tally*1000)/10).toString() + "%"
          })
        })
      });
      // const statsMap = formTotals.map(function(total, idx) {
      //   return (
      //     <div key={idx}>
      //       Question: {total.elementLabel} | Option: {total.optionLabel} | Total Responses: {total.responseTotal}
      //     </div>
      //   )
      // })
      return(
        <div>
          <br/>
          <h2 className="general-sub-header">
            Form Title: {this.props.form.name}
          </h2>
          {this.sortableTable("Survey Response Summary", formTotals, summaryColumns, "elementLabel")}
          <br/>
          {this.sortableTable("Survey Response List", formEntries, indexColumns, "elementLabel")}
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <nav className="main-nav-container">
          <img className="logo" src={window.logo} alt="" />
          <ul className="nav-ul">
            <li className="nav-element">
              <a href="https://github.com/patrickdlandy/FormView" className="nav-link" target="_blank">GITHUB</a>
            </li>
            <li className="nav-element">
              <a href="https://www.linkedin.com/in/patrick-d-landy-pe-178a279a//" className="nav-link" target="_blank">LINKEDIN</a>
            </li>
            <li className="nav-element">
              <a href="https://angel.co/patrick-d-landy" className="nav-link" target="_blank">ANGELLIST</a>
            </li>
          </ul>
          <ul className="username-link">
            <li onClick={this.handleClick}>
              <h2>{this.props.currentUser.username + " ⌄"}</h2>
            </li>
            <ul className={this.state.menuDisplayed ? "dropdown" : "dropdown-hidden"}>
              <li className="dropdown-item-background">
                <Link to="/" className="dropdown-link-item" onClick={this.props.logout}>Log Out</Link>
              </li>
              <li className="dropdown-item-background">
                <Link to="/" className="dropdown-link-item">Your Forms</Link>
              </li>
              <li className="dropdown-item-background">
                <a href="https://github.com/patrickdlandy" className="dropdown-link-item" target="_blank">Github</a>
              </li>
              <li className="dropdown-item-background">
                <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="dropdown-link-item" target="_blank">LinkedIn</a>
              </li>
            </ul>
          </ul>
        </nav>
        <main className="bottom-container">
          <div>
              {this.renderResponses()}
          </div>
        </main>
      </div>
    )
  }
}


export default ResponseIndex;