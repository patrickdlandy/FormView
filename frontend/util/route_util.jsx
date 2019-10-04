import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = function({ component: Component, path, loggedIn, exact }) {
    return(
        <Route  
            path={path}
            exact={exact}
            render={function(props) {
                    if (!loggedIn) {
                        return(
                            <Component {...props} />
                        )
                    } else {
                        return(
                            <Redirect to="/" />
                        )
                    }
                }
            }
        />
    );
}

const mapStateToProps = function(state) {
    return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(
    connect(
        mapStateToProps,
        null
    )(Auth)
);