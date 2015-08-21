
import { Button, Grid, Row, Col } from "react-bootstrap";
import { Icon, Paper, Divider } from "../controls";

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = { };

    if (window.redirect){
      this.state.redirect = window.redirect;
    }

  }

  render() {

    let uris = {
      twitter: "/auth/twitter",
      facebook: "/auth/facebook",
      google: "/auth/google"
    };

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

              <Col xs={8} xsOffset={2} md={6} mdOffset={3}>

                <Row>
                  <Col xs={4} className="text-center">
                    <Button href={uris.twitter} className="btn-social twitter">
                      <Icon name="twitter" />
                    </Button>
                  </Col>

                  <Col xs={4} className="text-center">
                    <Button href={uris.facebook} className="btn-social facebook">
                      <Icon name="facebook" />
                    </Button>
                  </Col>

                  <Col xs={4} className="text-center">
                    <Button href={uris.google} className="btn-social google">
                      <Icon name="google" />
                    </Button>
                  </Col>
                </Row>

              </Col>
            </Row>

          </form>

        </Paper>
      </Grid>
    );
  }

};
