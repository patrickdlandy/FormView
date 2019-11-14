import { connect } from 'react-redux';
import ElementCreate from './element_create';
import { createElement, clearElementErrors } from '../../actions/element_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  debugger
  const formId = parseInt(ownProps.match.params.formId);
  return({
    currentUser: state.entities.users[state.session.id],
    formId: formId,
    element: {
      title: "",
      body: "",
      order: 1,
      form_id: formId
    },
    errors: state.errors.elements
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    createElement: (element) => dispatch(createElement(element)),
    logout: () => dispatch(logout()),
    clearElementErrors: () => dispatch(clearElementErrors())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementCreate);