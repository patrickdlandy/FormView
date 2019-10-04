import { connect } from 'react-redux';
import React from 'react';
import SignupForm from './signup_form';
import { signup } from '../../actions/session_actions'

const mapStateToProps = function (state, ownProps) {
    return ({
        errors: state.errors.session,
        formType: 'signup'
    });
}

const mapDispatchToProps = function (dispatch, ownProps) {
    return ({
        processForm: (user) => dispatch(signup(user))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);