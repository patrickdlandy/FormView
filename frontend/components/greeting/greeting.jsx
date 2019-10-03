import React from 'react';
import { Link } from 'react-router-dom';



const Greeting = function(props) {
    const sessionLinks = function() {
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up!</Link>
        </nav>
    }
    const personalGreeting = function() {
        <hgroup>
            <h2>Hi, {currentUser.username}!</h2>
            <button onClick={logout}>Log Out</button>
        </hgroup>
    }
    if (currentUser) {
        return personalGreeting();
    } else {
        return sessionLinks();
    }
}

export default Greeting;