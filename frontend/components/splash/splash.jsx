import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.renderFormList = this.renderFormList.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.fetchForms();
        }
    }

    componentWillUnmount() {
        this.props.clearForms();
    }

    renderFormList() {
        if (this.props.forms.length > 0) {
            // console.log(this.props.forms);
            return(
                <div>
                    {this.props.forms.map(function(form, i) {
                        return (
                            <li className="" key={`form-${i}`}>
                                {form.name}
                                <div>
                                    {form.description}
                                </div>
                                <div>
                                    <Link to={`/forms/${form.id}`}>View Form</Link>
                                </div>
                            </li>
                        )
                    })}
                </div>
            );
        } else {
            return (<h1>You have not made any forms yet!</h1>);
        }
    }

    render() {
        if (!this.props.currentUser) {
            return(
                <div>
                <nav className="main-nav-container">
                    <h1 className="nav-element">FormView by Patrick Landy</h1>
                    <ul className="nav-ul">
                        <li className="nav-element">
                            <a href="https://github.com/patrickdlandy" className="nav-link" target="_blank">GITHUB</a>
                        </li>
                        <li className="nav-element">
                            <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="nav-link" target="_blank">LINKEDIN</a>
                        </li>
                    </ul> 
                    <nav className="signup-btn-container">
                        <Link to="/signup" className="signup-btn">SIGN UP</Link>
                    </nav>
                    <Link to="/login" 
                    className="login-link" 
                    data-hover-replace="GRONK!"
                    data-original-text="LOGIN"
                    >LOGIN</Link>
                </nav>
                <main className="main-container">
                    <div>
                        <h1 className="general-main-header">Build and share online forms</h1>
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
            return(
                <div>
                    <nav className="main-nav-container">
                        <h1 className="nav-element">FormView by Patrick Landy</h1>
                        <ul className="nav-ul">
                            <li className="nav-element">
                                <a href="https://github.com/patrickdlandy" className="nav-link" target="_blank">GITHUB</a>
                            </li>
                            <li className="nav-element">
                                <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="nav-link" target="_blank">LINKEDIN</a>
                            </li>
                        </ul>
                        <ul className="username-link">
                            <li>
                                <h2>{this.props.currentUser.username + " ⌄"}</h2>
                            </li>
                            <ul className="dropdown">
                                <li>
                                    <Link to="/" className="dropdown-link-item" onClick={this.props.logout}>Log Out</Link>
                                </li>
                                <li>
                                    <a href="https://github.com/patrickdlandy" className="dropdown-link-item" target="_blank">Github</a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="dropdown-link-tem" target="_blank">LinkedIn</a>
                                </li>
                            </ul>
                        </ul>
                    </nav>
                    <main className="bottom-container">
                        <div>
                            <h1 className="general-sub-header">Form Manager</h1>
                        </div>
                        {this.renderFormList()}
                    </main>
                </div>
            );
        }
    }
}

//Old splash (pre-react component)

// const renderForms = function(props) {
    //props.fetchForms();
    // return(
    //     <div>
    //         {props.forms.map( function(form, i){
    //             return (
    //                 <li className="" key={`form-${i}`}>
    //                     {form.name}
    //                 </li>
    //             )
    //         })}
    //     </div>
    // );
// }

// const Splash = function(props) {
//     if (!props.currentUser) {
//         return(
//             <div>
//             <nav className="main-nav-container">
//                 <h1 className="nav-element">FormView by Patrick Landy</h1>
//                 <ul className="nav-ul">
//                     <li className="nav-element">
//                         <a href="https://github.com/patrickdlandy" className="nav-link" target="_blank">GITHUB</a>
//                     </li>
//                     <li className="nav-element">
//                         <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="nav-link" target="_blank">LINKEDIN</a>
//                     </li>
//                 </ul> 
//                 <nav className="signup-btn-container">
//                     <Link to="/signup" className="signup-btn">SIGN UP</Link>
//                 </nav>
//                 <Link to="/login" 
//                 className="login-link" 
//                 data-hover-replace="GRONK!"
//                 data-original-text="LOGIN"
//                 >LOGIN</Link>
//             </nav>
//             <main className="main-container">
//                 <div>
//                     <h1 className="general-main-header">Build and share online forms</h1>
//                     <div>
//                         <Link to="/login">Login</Link>
//                         <br/>
//                         <Link to="/signup">Sign Up!</Link>
//                     </div>
//                 </div>
//             </main>
//             <div className="bottom-container">
//                 <div>
//                     <h2 className="general-sub-header">Building online forms can be hard. </h2>
//                     <h3 className="general-sub-header">FormView makes it easy. </h3>
//                 </div>
//             </div>
//             </div>
//         )
//     } else {
//         return(
//             <div>
//                 <nav className="main-nav-container">
//                     <h1 className="nav-element">FormView by Patrick Landy</h1>
//                     <ul className="nav-ul">
//                         <li className="nav-element">
//                             <a href="https://github.com/patrickdlandy" className="nav-link" target="_blank">GITHUB</a>
//                         </li>
//                         <li className="nav-element">
//                             <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="nav-link" target="_blank">LINKEDIN</a>
//                         </li>
//                     </ul>
//                 </nav>
//                 <main className="bottom-container">
//                     <div>
//                         <h1 className="general-sub-header">Form Manager</h1>
//                         {renderForms(props)}
//                     </div>
//                 </main>
//             </div>
//         );
//     }
// }

export default Splash;