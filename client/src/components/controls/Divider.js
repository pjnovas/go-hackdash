
import { Row, Col } from "react-bootstrap";

export default class Divider extends React.Component {

  render() {
    return (
      <Row>
        <Col xs={12}>
          <div className="divider"></div>
        </Col>
      </Row>
    );
  }

};

Divider.displayName = "Divider";
