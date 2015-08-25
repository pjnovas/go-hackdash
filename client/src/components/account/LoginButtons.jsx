
import { Button, Grid, Row, Col } from "react-bootstrap";
import { Icon, Paper, Divider } from "../controls";

export default class LoginButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginButtons.defaultState;
  }

  render() {

    if (this.state.redirect){
      for (let p in uris){
        uris[p] += "?redirect=" + this.state.redirect;
      }
    }

    return (
      <div className="text-center">
      { this.state.providers.map( provider => {
        return (
          <Button key={provider}
            href={"/auth/" + provider}
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
  redirect: window.redirect || ""
};
