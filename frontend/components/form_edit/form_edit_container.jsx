import { connect } from 'react-redux';
import FormEdit from './form_edit';
import { updateForm, clearFormErrors }  from '../../actions/form_actions';
import { logout } from '../../actions/session_actions';


export const mapStateToProps = function (state, ownProps) {
    const formId = parseInt(ownProps.match.params.formId);
    return ({
        currentUser: state.entities.users[state.session.id],
        form: state.entities.forms[formId],
        errors: state.errors.forms
    })
}

export const mapDispatchToProps = function (dispatch) {
    return ({
       updateForm: (form) => dispatch(updateForm(form)),
       logout: () => dispatch(logout()),
       clearFormErrors: () => dispatch(clearFormErrors())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);