import React from 'react';
import { Link } from 'react-router-dom';

class Placeholder extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <nav className="main-nav-container">
          <Link to="/" className="nav-element-logo-link">
            <img className="logo" src={window.logo} alt="" />
          </Link>
          <ul className="nav-ul">
            <li className="nav-element">
              <a href="https://github.com/patrickdlandy/FormView" className="nav-link" target="_blank">GITHUB</a>
            </li>
            <li className="nav-element">
              <a href="https://www.linkedin.com/in/patrick-d-landy-pe-178a279a//" className="nav-link" target="_blank">LINKEDIN</a>
            </li>
            <li className="nav-element">
              <a href="https://angel.co/patrick-d-landy" className="nav-link" target="_blank">ANGELLIST</a>
            </li>
          </ul>
          <Link to="/login"
            className="login-link"
          >LOGIN</Link>
        </nav>
        <h2>Loading</h2>
      </div>
    );
  }
}

export default Placeholder;