
import Header from "./Header.jsx";

import { Grid, Row, Col, Button } from "react-bootstrap";
import { Icon } from "./controls";

export default class Home extends React.Component {

  render() {
    return (
      <div className="landing">
        <Header hideprofile={true} />

        <div className="landing-header">
          <div className="text-vcenter call-action">

            <div className="logo"></div>

            <h1>{__.app_title}</h1>
            <h2>{__.landing_legend}</h2>

            <Grid fluid>

              <Row>
                <Col xs={12}>
                  <Button bsSize="large" className="btn-continue">
                    <Icon name="angle-down" />
                  </Button>
                </Col>
              </Row>

            </Grid>

          </div>
        </div>

      </div>
    );
  }

};

/*

<Row>

  <Col xs={12}>
    <Button bsSize="large" className="btn-create">
      {__.landing_create_poll}
    </Button>
  </Col>

</Row>
*/
