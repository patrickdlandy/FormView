import { connect } from 'react-redux';
import Splash from './splash';
import  { fetchForms, clearForms, clearFormErrors } from '../../actions/form_actions'
import { login, logout } from '../../actions/session_actions';

export const mapStateToProps = function(state) {
    return ({
        currentUser: state.entities.users[state.session.id],
        forms: Object.values(state.entities.forms),
        demoUser: { username: "demo-user", password: "123456" }
    })
}

export const mapDispatchToProps = function(dispatch) {
    return ({
        fetchForms: () => dispatch(fetchForms()),
        logout: () => dispatch(logout()),
        clearForms: () => dispatch(clearForms()),
        clearFormErrors: () => dispatch(clearFormErrors()),
        login: (user) => dispatch(login(user))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

//FIGURE OUT HOW TO RENDER THE FORMS IN THE SPLASH COMPONENT.