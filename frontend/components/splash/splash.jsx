import React from 'react';
import { Link } from 'react-router-dom';

const Splash = function(props) {
    if (!props.currentUser) {
        return(
            <div>
            <nav className="main-nav-container">
                <h1 className="nav-element">FormView by Patrick Landy</h1>
                <ul>
                    <li className="nav-element">
                        <a href="https://github.com/patrickdlandy" class="nav-link">GITHUB</a>
                    </li>
                    <li className="nav-element">
                        <a href="https://github.com/patrickdlandy" class="nav-link">LINKEDIN</a>
                    </li>
                </ul>
                <ul>
                    <li>   
                        <Link to="/signup" className="signup-btn">SIGN UP</Link>
                    </li>
                    <li className="nav-element-right">
                        <Link to="/login">LOGIN</Link>
                    </li> 
                </ul>
            </nav>
            <main className="main-container">
                <div>
                    <h1 className="general-main-header">Build and Share Online Forms</h1>
                    <div>
                        <Link to="/login">Login</Link>
                        <br/>
                        <Link to="/signup">Sign Up!</Link>
                    </div>
                </div>
            </main>
            <div className="bottom-container">
                <div>
                    <h2 className="general-sub-header">Building online forms can be hard. </h2>
                    <h3 className="general-sub-header">FormView makes it easy. </h3>
                </div>
            </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Splash;