import { connect } from 'react-redux';
import React from 'react';
import FormShare from './form_share';
import { fetchForm } from '../../actions/form_actions';

const mapStateToProps =  function(state, ownProps) {
  const formId = parseInt(ownProps.match.params.formId);
  return({
    errors: state.errors.forms,
    formId: formId,
    form: state.entities.forms[formId],
  });
}

const mapDispatchToProps = function(dispatch) {
  return({
    fetchForm: (id) => dispatch(fetchForm(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormShare);