import { connect } from 'react-redux';
import FormCreate from './form_create';
import { createForm, clearFormErrors }  from '../../actions/form_actions';
import { logout } from '../../actions/session_actions';


export const mapStateToProps = function (state, ownProps) {
    return ({
        currentUser: state.entities.users[state.session.id],
        form: {
            name: "",
            user_id: state.session.id,
            description: ""
        },
        errors: state.errors.forms
    })
}

export const mapDispatchToProps = function (dispatch) {
    return ({
       createForm: (form) => dispatch(createForm(form)),
       logout: () => dispatch(logout()),
       clearFormErrors: () => dispatch(clearFormErrors())
    })
} 

export default connect(mapStateToProps, mapDispatchToProps)(FormCreate);