import { connect } from 'react-redux';
import React from 'react';
import FormShare from './form_share';
import { fetchForm, clearForms } from '../../actions/form_actions';
import { fetchElement, clearElements } from '../../actions/element_actions';
import { fetchOption, clearOptions } from '../../actions/option_actions';
import { createResponse, clearResponses, clearResponseErrors, receiveResponseErrors } from '../../actions/response_actions';

const mapStateToProps =  function(state, ownProps) {
  const formId = parseInt(ownProps.match.params.formId);
  return({
    errors: state.errors.responses,
    formId: formId,
    form: state.entities.forms[formId],
    elements: state.entities.elements,
    options: state.entities.options
  });
}

const mapDispatchToProps = function(dispatch) {
  return({
    fetchForm: (id) => dispatch(fetchForm(id)),
    clearForms: () => dispatch(clearForms()),
    fetchElement: (id) => dispatch(fetchElement(id)),
    clearElements: () => dispatch(clearElements()),
    fetchOption: (id) => dispatch(fetchOption(id)),
    clearOptions: () => dispatch(clearOptions()),
    createResponse: (response) => dispatch(createResponse(response)),
    clearResponses: () => dispatch(clearResponses()),
    clearResponseErrors: () => dispatch(clearResponseErrors()),
    receiveResponseErrors: (errors) => dispatch(receiveResponseErrors(errors))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormShare);