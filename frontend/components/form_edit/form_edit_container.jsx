import { connect } from 'react-redux';
import FormEdit from './form_edit';
import { fetchForm, updateForm, clearFormErrors }  from '../../actions/form_actions';
import { logout } from '../../actions/session_actions';


export const mapStateToProps = function (state, ownProps) {
    const formId = parseInt(ownProps.match.params.formId);
    return ({
        currentUser: state.entities.users[state.session.id],
        form: state.entities.forms[formId],
        errors: state.errors.forms,
        formId: formId
    })
}

export const mapDispatchToProps = function (dispatch) {
    return ({
        fetchForm: (id) => dispatch(fetchForm(id)),
        updateForm: (form) => dispatch(updateForm(form)),
        logout: () => dispatch(logout()),
        clearFormErrors: () => dispatch(clearFormErrors())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);