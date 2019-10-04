import { connect } from 'react-redux';
import Splash from './splash';

export const mapStateToProps = function(state) {
    return ({
        currentUser: state.entities.users[state.session.id]
    })
}

export const mapDispatchToProps = function(dispatch) {
    return ({
        
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);