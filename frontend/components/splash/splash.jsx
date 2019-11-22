import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderFormList = this.renderFormList.bind(this);
        this.loginDemoUser = this.loginDemoUser.bind(this);
        this.state = {
            menuDisplayed: false
        }
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.fetchForms();
        }
    }

    componentWillUnmount() {
        // debugger
        this.props.clearForms();
        this.props.clearFormErrors();
    }

    loginDemoUser() {
        let demoUser = this.props.demoUser; 
        let myHistory = this.props.history;
        this.props.login(demoUser).then(
            () =>  {
                myHistory.push('/login')
            }
        );
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(function(state) {
            return ({
                menuDisplayed: !state.menuDisplayed
            });
        });
    }

    renderFormList() {
        if (this.props.forms.length > 0) {
            return(
                <div>
                    {this.props.forms.map(function(form, i) {
                        return (
                            <li className="" key={`form-${i}`}>
                                <div>
                                    {form.name}
                                </div>
                                <div>
                                    <Link to={`/forms/${form.id}`}>View</Link>
                                    <label> | </label>
                                    <Link to={`/edit/${form.id}`}>Edit</Link>
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
                    <img className="logo" src={window.logo} alt=""/>
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
                    <div className="cloud-img-container-upper-left">
                        <img src={window.cloud} className="cloud-img" alt="" />
                    </div>
                    <div className="cloud-img-container-upper-right">
                        <img src={window.cloud} className="cloud-img" alt="" />
                    </div>
                    <div className="cloud-img-container-lower-left">
                        <img src={window.cloud} className="cloud-img" alt="" />
                    </div>
                    <div className="cloud-img-container-lower-right">
                        <img src={window.cloud} className="cloud-img" alt="" />
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="general-main-header">Build online survey forms</h1>
                    <div className="glyptodon-image-container">
                        <img src={window.glyptodon} alt="Hi there! I'm a friendly form-building glyptodon!" />
                    </div>
                    <div className="center-button-container">
                        <Link to="/" className="center-left-button" onClick={this.loginDemoUser}>DEMO</Link>
                        <Link to="/signup" className="center-right-button">SIGN UP</Link>
                    </div>
                </main>
                <div className="bottom-container">
                    <div className="bottom-container-div">
                        <h2 className="general-sub-header">Building online forms can be hard.
                        <br/>
                        <span>FormView</span>
                           {` makes it easy.`}</h2>
                        <p> Customize questions, share survey links, and view the results you need.</p>
                    </div>
                    <div className="bottom-icons-container">
                        <div className="bottom-icon-container">
                            <div>
                                <img src={window.two_forms} className="icon-img" alt="" />
                            </div>
                            <h1>CREATE A FORM!</h1>
                            <div>Use the form builder to customize your form.</div>
                        </div>
                        <div className="bottom-icon-arrow-container">
                            <div>
                                <img src={window.arrow} className="arrow" alt="" />
                            </div>
                        </div>
                        <div className="bottom-icon-container">
                            <div>
                                <img src={window.person} className="icon-img" alt="" />
                            </div>
                            <h1>SHARE IT!</h1>
                            <div>Send links to survey recipients.</div>
                        </div>
                        <div className="bottom-icon-arrow-container">
                            <div>
                                <img src={window.arrow} className="arrow" alt="" />
                            </div>
                        </div>
                        <div className="bottom-icon-container">
                            <div>
                                <img src={window.loop} className="icon-img" alt="" />
                            </div>
                            <h1>GET YOUR DATA!</h1>
                            <div>Log in to view your survey results.</div>
                        </div>
                    </div>
                    <div className="bottom-container-div">
                        <div className="credits-container">
                            <p>FormView design and functionality inspired by <a target="_blank" href="https://www.wufoo.com/">Wufoo</a></p>
                            <p>Wufoo legacy styling is archived <a target="_blank" href="https://web.archive.org/web/20191012012529/https://www.wufoo.com/">here</a></p>
                            <p>Glyptodon artwork by Rachel Margolis</p>
                            <p>Arrow icon made by <a target="_blank" href="https://www.flaticon.com/authors/lyolya" title="Lyolya">Lyolya</a> from <a target="_blank" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
                        </div>
                    </div>
                </div>
                </div>
            )
        } else {
            return(
                <div>
                    <nav className="main-nav-container">
                        <img className="logo" src={window.logo} alt="" />
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
                        <ul className="username-link" >
                            <li onClick={this.handleClick}>
                                <h2>{this.props.currentUser.username + " ⌄"}</h2> 
                            </li>

                            <ul className={this.state.menuDisplayed ? "dropdown" : "dropdown-hidden"}>
                                <li className="dropdown-item-background">
                                    <Link to="/" className="dropdown-link-item" onClick={this.props.logout}>Log Out</Link>
                                </li>
                                <li className="dropdown-item-background">
                                    <a href="https://github.com/patrickdlandy" className="dropdown-link-item" target="_blank">Github</a>
                                </li>
                                <li className="dropdown-item-background">
                                    <a href="https://www.linkedin.com/in/patrick-landy-pe-cphc-178a279a/" className="dropdown-link-item" target="_blank">LinkedIn</a>
                                </li>
                            </ul>
                        </ul>
                    </nav>
                    <main className="bottom-container-short">
                        <div className="form-index-header">
                            <h1 className="general-sub-header">Form Manager</h1>
                            <Link className="create-new-form-button" to="/new"> +  CREATE A NEW FORM</Link>
                        </div>
                    </main>
                    <div className="bottom-form-container">
                        <div className="form-index-header">
                            {this.renderFormList()}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(Splash);