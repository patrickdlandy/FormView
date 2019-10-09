import { connect } from 'react-redux';
import FormShow from './form_show';

export const mapStateToProps = function(state, ownProps) {
    const formId = parseInt(ownProps.match.params.formId);
    return({
        currentUser: state.entities.users[state.session.id],
        formId: formId,
        form: state.entities.forms[formId]
    })
}

export const mapDispatchToProps = function(dispatch) {
    return ({
        fetchForm: (id) => dispatch(fetchForms(id)),
        logout: () => dispatch(logout()),
        clearForms: () => dispatch(clearForms())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FormShow);