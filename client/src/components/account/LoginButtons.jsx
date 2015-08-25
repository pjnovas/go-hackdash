
import { Button, Grid, Row, Col } from "react-bootstrap";
import { Icon, Paper, Divider } from "../controls";

export default class LoginButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginButtons.defaultState;
  }

  render() {

    let redirect = "";
    if (this.state.redirect){
      redirect += "?redirect=" + this.state.redirect;
    }

    return (
      <div className="text-center">
      { this.state.providers.map( provider => {
        return (
          <Button key={provider}
            href={"/auth/" + provider + redirect}
            className={"btn-social " + provider}>
            <Icon name={provider} />
          </Button>
        );
      }) }
      </div>
    );
  }

};

LoginButtons.displayName = "LoginButtons";
LoginButtons.defaultState = {
  providers: window.__settings.providers || [],
  redirect: window.redirect || "/polls"
};
