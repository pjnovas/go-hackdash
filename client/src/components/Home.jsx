
import Header from "./Header.jsx";
import Latest from "./polls/Latest.jsx";

import { Grid, Row, Col, Button } from "react-bootstrap";
import { Icon } from "./controls";

import {Link, Element} from 'react-scroll';

export default class Home extends React.Component {

  onCreateClick() {

  }

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
                  <Link to="latests" spy={true} smooth={true} duration={1000} offset={-55}>
                    <Button bsSize="large" className="btn-continue">
                      <Icon name="angle-down" />
                    </Button>
                  </Link>
                </Col>
              </Row>

            </Grid>

          </div>
        </div>

        <Element name="latests" className="latest-polls">
          <Latest onCreateClick={ () => this.onCreateClick() } />
        </Element>

        <div className="footer">

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
