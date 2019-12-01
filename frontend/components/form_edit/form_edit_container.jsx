import { connect } from 'react-redux';
import FormEdit from './form_edit';
import { fetchForm, updateForm, clearFormErrors, deleteForm, clearForms }  from '../../actions/form_actions';
import { fetchElements, createElement, clearElementErrors, updateElement, deleteElement, clearElements } from '../../actions/element_actions';
import { fetchOptions, createOption, clearOptionErrors, updateOption, deleteOption, clearOptions } from '../../actions/option_actions';
import { logout } from '../../actions/session_actions';


export const mapStateToProps = function (state, ownProps) {
    const formId = parseInt(ownProps.match.params.formId);
    return ({
        currentUser: state.entities.users[state.session.id],
        form: state.entities.forms[formId],
        errors: state.errors.forms,
        elements: state.entities.elements,
        options: state.entities.options,
        elementErrors: state.errors.elements,
        optionErrors: state.errors.options,
        formId: formId
    })
}

export const mapDispatchToProps = function (dispatch) {
    //need fetchOptions
    return ({
        fetchForm: (id) => dispatch(fetchForm(id)),
        fetchElements: () => dispatch(fetchElements()),
        fetchOptions: () => dispatch(fetchOptions()),
        updateForm: (form) => dispatch(updateForm(form)),
        deleteForm: (id) => dispatch(deleteForm(id)),
        logout: () => dispatch(logout()),
        clearFormErrors: () => dispatch(clearFormErrors()),
        clearForms: () => dispatch(clearForms()),
        createElement: (element) => dispatch(createElement(element)),
        clearElementErrors: () => dispatch(clearElementErrors()),
        clearElements: () => dispatch(clearElements()),
        updateElement: (element) => dispatch(updateElement(element)),
        deleteElement: (id) => dispatch(deleteElement(id)),
        createOption: (option) => dispatch(createOption(option)),
        clearOptionErrors: () => dispatch(clearOptionErrors()),
        clearOptions: () => dispatch(clearOptions()),
        updateOption: (option) => dispatch(updateOption(option)),
        deleteOption: (option) => dispatch(deleteOption(option)),

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);