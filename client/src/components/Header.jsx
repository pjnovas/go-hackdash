
import { Link } from "react-router";
import { NavItemLink } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Icon, Avatar } from "./controls";

import LoginModal from "./account/LoginModal.jsx";

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = Header.defaultState;
  }

  showLoginModal() {
    this.setState({ showLogin: true });
  }

  render() {
    let isLogin = window.user ? true : false;
    let css = this.props.flat ? "no-shadow" : "z2";

    return (
      <Navbar fluid={true} fixedTop={true} className={css}>

      {(this.props.backto ?
        <ul className="nav navbar-nav navbar-left">
          <NavItemLink className="navbar-icon" to={this.props.backto} params={this.props.backparams}>
            <Icon name="arrow-left" />
          </NavItemLink>
        </ul>
      : null )}

      <ul className="nav navbar-nav navbar-left">
        <li className="navbar-brand">{this.props.title || __.app_title}</li>
      </ul>

      {this.props.searchbox ?
        <div className="nav navbar-nav navbar-searchbox">
          <Icon name="search" />
          <form role="search">
            <input type="text" autoComplete="off"
              value={ this.props.search }
              onFocus={ () => this.props.onFocus() } 
              onChange={ e => this.props.onSearch(e.target.value) } />
          </form>
        </div>
      : null }

      { isLogin ?
        <ul className="nav navbar-nav navbar-right right-abs">
          <li className="dropdown">

            <a className="dropdown-toggle user-pic" data-toggle="dropdown">
              <Avatar src={window.user.picture} />
            </a>

            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <Link to="polls">{__.account_mypolls}</Link>
              </li>
              <li>
                <a href="/logout">{__.account_logout}</a>
              </li>
            </ul>
          </li>
        </ul>
      :
        <ul className="nav navbar-nav navbar-right">
          <NavItem className="login-link" onClick={ () => this.showLoginModal() }>
            {__.account_login}
          </NavItem>
        </ul>
      }

      {this.state.showLogin ?
      <LoginModal
        show={this.state.showLogin}
        onClose={ () => this.setState({ showLogin: false }) } />
      : null }

      </Navbar>
    );

  }
};

Header.displayName = "Header";
Header.defaultState = {
  showLogin: false
};
