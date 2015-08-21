
import { Button, Grid, Row, Col } from "react-bootstrap";
import { Icon, Paper, Divider } from "../controls";

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = Login.defaultState;
  }

  render() {

    if (this.state.redirect){
      for (let p in uris){
        uris[p] += "?redirect=" + this.state.redirect;
      }
    }

    return (
      <Grid>
        <Paper>

          <form>

            <h1>{__.app_title}</h1>
            <Divider />

            <Row>

              <Col xs={12}>
                <h3>{__.account_title_social}</h3>
              </Col>

              <Col xs={8} xsOffset={2} md={6} mdOffset={3} className="text-center">

                { this.state.providers.map( provider => {
                  return (
                    <Button key={provider}
                      href={"/auth/" + provider}
                      className={"btn-social " + provider}>
                      <Icon name={provider} />
                    </Button>
                  );
                }) }

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
