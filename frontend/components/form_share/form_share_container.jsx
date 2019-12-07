import { connect } from 'react-redux';
import React from 'react';
import FormShare from './form_share';
import { fetchForm } from '../../actions/form_actions';
import { fetchElement } from '../../actions/element_actions';

const mapStateToProps =  function(state, ownProps) {
  const formId = parseInt(ownProps.match.params.formId);
  return({
    errors: state.errors.forms,
    formId: formId,
    form: state.entities.forms[formId],
    elements: state.entities.elements
  });
}

const mapDispatchToProps = function(dispatch) {
  return({
    fetchForm: (id) => dispatch(fetchForm(id)),
    fetchElement: (id) => dispatch(fetchElement(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormShare);