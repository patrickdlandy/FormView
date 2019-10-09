import { connect } from 'react-redux';
import Splash from './splash';
import  { fetchForms, clearForms } from '../../actions/form_actions'
import { logout } from '../../actions/session_actions';

export const mapStateToProps = function(state) {
    return ({
        currentUser: state.entities.users[state.session.id],
        forms: Object.values(state.entities.forms)
    })
}

export const mapDispatchToProps = function(dispatch) {
    return ({
        fetchForms: () => dispatch(fetchForms()),
        logout: () => dispatch(logout()),
        clearForms: () => dispatch(clearForms())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

//FIGURE OUT HOW TO RENDER THE FORMS IN THE SPLASH COMPONENT.