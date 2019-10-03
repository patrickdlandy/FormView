import { connect } from 'redux';
import Greeting from './greeting';
import { logout } from '../../actions/session_actions'

export const mapStateToProps = function({ session, entities: { users } }) {
  return {(
    currentUser: users[session.id]
  )}
}

export const mapDispatchToProps = function(dispatch) {
  return {(
    logout: () => dispatch(logout())
  )}
}

export default connect(mapDispatchToProps, mapStateToProps)(Greeting);
