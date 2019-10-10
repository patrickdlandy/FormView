import { connect } from 'react-redux';
import FormCreate from './form_create';
import { createForm }  from '../../actions/form_actions';
import { logout } from '../../actions/session_actions';


export const mapStateToProps = function (state, ownProps) {
    return ({
        currentUser: state.entities.users[state.session.id],
        form: {
            name: "",
            user_id: state.session.id,
            description: ""
        }
    })
}

export const mapDispatchToProps = function (dispatch) {
    return ({
       createForm: (form) => dispatch(createForm(form)),
       logout: () => dispatch(logout())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCreate);