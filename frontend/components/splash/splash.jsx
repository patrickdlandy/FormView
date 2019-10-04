import React from 'react';
import { Link } from 'react-router-dom';

const Splash = function(props) {
    if (!props.currentUser) {
        return(
            <main>
                <div>
                    <h1>Build and Share Online Forms</h1>
                    <div>
                        <Link to="/login">Login</Link>
                        <br/>
                        <Link to="/signup">Sign Up!</Link>
                    </div>
                </div>
                <div>
                    <h2>Building online forms can be hard. </h2>
                    <h3>FormView makes it easy. </h3>
                </div>
            </main>
        )
    } else {
        return null;
    }
}

export default Splash;