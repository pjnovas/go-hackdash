
import { NavItemLink } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { Icon, Avatar } from './controls';

export default class Header extends React.Component {

  render() {
    let profilePic = window.user ? window.user.picture : null;
    let css = this.props.flat ? "no-shadow" : "z2";

    return (
      <Navbar fluid={true} fixedTop={true} className={css}>

      {(this.props.backto ?
        <ul className="nav navbar-nav navbar-left">
          <NavItemLink className="navbar-back" to={this.props.backto} params={this.props.backparams}>
            <Icon name="arrow-left" />
          </NavItemLink>
        </ul>
      : null )}

      <ul className="nav navbar-nav navbar-left">
        <li className="navbar-brand">{this.props.title || __.app_title}</li>
      </ul>

      {(this.props.hideprofile ? null :
        <ul className="nav navbar-nav navbar-right">
          <NavItemLink to="profile" className="navbar-profile">
            <Avatar src={profilePic} />
          </NavItemLink>
        </ul>
      )}

    </Navbar>
    );

  }
};
