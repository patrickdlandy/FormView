import { connect } from 'react-redux';
import FormEdit from './form_edit';
import { fetchForm, updateForm, clearFormErrors, deleteForm }  from '../../actions/form_actions';
import { fetchElements, createElement, clearElementErrors, updateElement } from'../../actions/element_actions';
import { logout } from '../../actions/session_actions';


export const mapStateToProps = function (state, ownProps) {
    const formId = parseInt(ownProps.match.params.formId);
    return ({
        currentUser: state.entities.users[state.session.id],
        form: state.entities.forms[formId],
        errors: state.errors.forms,
        elements: state.entities.elements,
        elementErrors: state.errors.elements,
        formId: formId
    })
}

export const mapDispatchToProps = function (dispatch) {
    return ({
        fetchForm: (id) => dispatch(fetchForm(id)),
        fetchElements: () => dispatch(fetchElements()),
        updateForm: (form) => dispatch(updateForm(form)),
        deleteForm: (id) => dispatch(deleteForm(id)),
        logout: () => dispatch(logout()),
        clearFormErrors: () => dispatch(clearFormErrors()),
        createElement: (element) => dispatch(createElement(element)),
        clearElementErrors: () => dispatch(clearElementErrors()),
        updateElement: (element) => dispatch(updateElement(element))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);