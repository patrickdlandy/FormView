import { connect } from 'react-redux';
import ResponseIndex from './response_index';
import { fetchResponses, clearResponses } from '../../actions/response_actions';
import { fetchElements, clearElements } from '../../actions/element_actions';
import { fetchOptions, clearOptions } from '../../actions/option_actions';
import { fetchForm, clearForms } from '../../actions/form_actions';
export const mapStateToProps = function(state, ownProps) {
  const formId = parseInt(ownProps.match.params.formId);
  return({
    currentUser: state.entities.users[state.session.id],
    responses: state.entities.responses,
    options: state.entities.options,
    formId: formId
  })
}

export const mapDispatchToProps = function(dispatch) {
  return({
    fetchResponses: () => dispatch(fetchResponses()),
    clearResponses: () => dispatch(clearResponses()),
    logout: () => dispatch(logout()),
    fetchElements: () => dispatch(fetchElements()),
    fetchOptions: () => dispatch(fetchOptions()),
    clearElements: () => dispatch(clearElements()),
    clearOptions: () => dispatch(clearOptions()),
    fetchForm: (id) => dispatch(fetchForm(id)),
    clearForms: () => dispatch(clearForms())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseIndex);