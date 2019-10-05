import { connect } from 'react-redux';
import React from 'react';
import LoginForm from './login_form';
import { login } from '../../actions/session_actions'

const mapStateToProps = function(state, ownProps) {
    return({
        errors: state.errors.session,
        formType: 'login'
    });
}

const mapDispatchToProps = function(dispatch, ownProps) {
    // debugger
    return ({
        processForm: (user) => dispatch(login(user))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);