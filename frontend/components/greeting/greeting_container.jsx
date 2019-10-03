import { connect } from 'react-redux';
import Greeting from './greeting';
import { logout } from '../../actions/session_actions'

export const mapStateToProps = function(state) {
  return ({
    currentUser: state.entities.users[state.session.id]
  })
}

export const mapDispatchToProps = function(dispatch) {
  return ({
    logout: () => dispatch(logout())
  })
}

export default connect(mapDispatchToProps, mapStateToProps)(Greeting);
