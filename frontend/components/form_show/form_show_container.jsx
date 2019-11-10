import { connect } from 'react-redux';
import { fetchForm, clearForms } from '../../actions/form_actions';
import { fetchElements, clearElements } from '../../actions/element_actions';
import FormShow from './form_show';

export const mapStateToProps = function(state, ownProps) {
    const formId = parseInt(ownProps.match.params.formId);
    return({
        currentUser: state.entities.users[state.session.id],
        formId: formId,
        form: state.entities.forms[formId],
        elements: state.entities.elements
    })
}

export const mapDispatchToProps = function(dispatch) {
    return ({
        fetchForm: (id) => dispatch(fetchForm(id)),
        logout: () => dispatch(logout()),
        clearForms: () => dispatch(clearForms()),
        fetchElements: () => dispatch(fetchElements()),
        clearElements: () => dispatch(clearElements())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FormShow);