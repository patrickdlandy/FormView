import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = function(props) {
    const sessionLinks = function() {
        return(
        <nav className="main-nav-container">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up!</Link>
        </nav>
        )
    };
    const personalGreeting = function() {
        return(
        <hgroup>
            <h2>Hi, {props.currentUser.username}!</h2>
            <button onClick={props.logout}>Log Out</button>
        </hgroup>
        )
    };
    if (props.currentUser) {
        // debugger
        return personalGreeting();
    } else {
        // console.log(props);
        return sessionLinks();
    }
}

export default Greeting;