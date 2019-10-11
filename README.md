## FormView
# aA Fullstack Project
Patrick Landy

This ReadMe is current as of Friday, October 11th, 2019. 

This repository contains FormView, a web application created for my Full Stack project at App Academy NY (August 2019 cohort).

FormView is a single-page web application that uses PostgreSQL, Ruby on Rails, and React/Redux. It mimics the appearance and functionality of Wufoo by SurveyMonkey (https://www.wufoo.com/).

The application currently allows users to sign up, log in and log out of the site with front-end user authentication. It also allows users to create new survey forms, view individual forms, and view a list of his or her previous forms.

Additional planned features for FormView include form editing, addition of form elements (multiple choice, dropdown questions, etc), form sharing,and form data display.

FormView has been deployed to Heroku here: https://formview.herokuapp.com/

 # Technologies used:

-PostgreSQL database
    -Tables for Users, Forms, Elements, and Options
-MVC (Model/View/Controller) framework for back end
    -Ruby on Rails: Active Record model layer, controllers, views, router
    -JBuilder: conversion to JSON structures from back end views
-React/Redux framework for front end
    -Single page application using store container for front-end state
        -Store, Reducers, Actions, Asynchronous action creators
        -AJAX requests to back end routes 
    -React Components 
        -Containers (mapping state and dispatch to component props)
        -HashRouter for front end routing
    -CSS Styling for JSX components

## Key Feature Overview:

# Splash Page (front end route: #/)

The splash page functionality depends on a currentUser prop passed to the component from the frontend state.

-Conditional rendering based on log in
-Logged out:
    -Navigation bar with various CSS hover effects 
    -Styled links for demo login and sign up
    -Cute prehistoric creature artwork :)
    -Cloud artwork using public domain SVG (Scalable Vector Graphics)
-Logged in:
    -Form manager page with styled link to form create page
    -Modified nav bar with username and dropdown
    -Index of current user's forms

# Form Create Page (front end route: #/new)

The form create page allows users to enter the required attributes of a new survey form and persist the form to the database. The functionality of this page depends on a form errors reducer. When a required attribute is not included by the user and the form is submitted, errors are added to the front-end state and rendered on the form create page.  

 * Rendering errors in the form create component:

renderErrors() {
        return (
            <ul>
                {this.props.errors.map(function (error, i) {
                    return (
                        <li className="error" key={`error-${i}`}>
                            {error}
                        </li>
                    );
                })}
            </ul>
        );
    }

* Errors reducer (managing the slice of state for form errors):

import { RECEIVE_FORM_ERRORS, CLEAR_FORM_ERRORS } from "../actions/form_actions"

const formErrorsReducer = function(state = [], action) {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FORM_ERRORS:
            return action.errors;
        case CLEAR_FORM_ERRORS:
            return [];
        default:
            return state;
    }
}

export default formErrorsReducer;

* Simple Action Creator for Form Errors

export const receiveFormErrors = function(errors) {
    return({
        type: RECEIVE_FORM_ERRORS,
        errors: errors
    })
}

* Asynchronous action creator for form creation/errors

export const createForm = function(form) {
    return function(dispatch) {
        return FormApiUtil.createForm(form).then(
            function (payload) {
                dispatch(receiveForm(payload));
            },
            function (err) {
                dispatch(receiveFormErrors(err.responseJSON))
            }
        );
    }
}







