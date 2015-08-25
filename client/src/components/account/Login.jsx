
import { Button, Grid, Row, Col } from "react-bootstrap";
import { Icon, Paper, Divider } from "../controls";

import LoginButtons from "./LoginButtons.jsx";

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = Login.defaultState;
  }

  render() {

    return (
      <Grid>
        <Paper>

          <form>

            <h1>{__.app_title}</h1>
            <Divider />

            <Row>

              <Col xs={8} xsOffset={2} md={6} mdOffset={3}>
                <LoginButtons />
              </Col>
            </Row>

          </form>

        </Paper>
      </Grid>
    );
  }

};

Login.displayName = "Login";
Login.defaultState = {
  providers: window.__settings.providers || [],
  redirect: window.redirect || ""
};
