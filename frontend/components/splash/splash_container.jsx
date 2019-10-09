import { connect } from 'react-redux';
import Splash from './splash';
import  { fetchForms } from '../../actions/form_actions'

export const mapStateToProps = function(state) {
    return ({
        currentUser: state.entities.users[state.session.id],
        forms: state.entities.forms
    })
}

export const mapDispatchToProps = function(dispatch) {
    return ({
        fetchForms: () => dispatch(fetchForms())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

//FIGURE OUT HOW TO RENDER THE FORMS IN THE SPLASH COMPONENT.