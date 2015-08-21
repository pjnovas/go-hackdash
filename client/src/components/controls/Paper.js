
import { Row, Col } from "react-bootstrap";

export default class Paper extends React.Component {

  render() {
    var spacer = this.props.hasOwnProperty("skipHeader") ? "header-spacer " : "";
    var css = "paper " + spacer + (this.props.className || "");

    return (
      <Row className="paper-ctn">
        <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3} className={css}>
          {this.props.children}
        </Col>
      </Row>
    );
  }

};

Paper.displayName = "Paper";
