import { connect } from 'react-redux';
import React from 'react';
import SessionForm from './session_form';
import { login } from '../../actions/session_actions'

const mapStateToProps = function(state, ownProps) {
    return({
        errors: state.errors.session,
        formType: 'login'
    });
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return ({
        processForm: (user) => dispatch(login(user))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);