
import { Row, Col, Panel } from "react-bootstrap";
import Icon from "./Icon";

export default class Card extends React.Component {

  render() {
    let media;

    if (this.props.media){
      media = {
        backgroundImage: "url(" + this.props.media + ")"
      };
    }

    return (
      <Row>
        <Col xs={12} className="card">

          { this.props.htitle ?

            <Row className="header">

              <Col xs={2} sm={1}>
                <div className="avatar icon">
                  <Icon name={this.props.hicon} />
                </div>
              </Col>

              <Col xs={10} sm={11} className="content">
                <h2>{this.props.htitle}</h2>
                <h3>{this.props.hsubtitle}</h3>
              </Col>

            </Row>

          : null }

          { media ?
            <Row>
              <Col xs={12} className="media" style={media}>
              { !this.props.useHeader && this.props.title ?
                <h2 className="title">{this.props.title}</h2>
              : null }
              </Col>
            </Row>
          : null }

          { this.props.description ?
            <Row>
              <Col xs={12}>
                <div className="body">
                  {this.props.description}
                </div>
              </Col>
            </Row>
          : null }

          { this.props.actions && this.props.actions.length ?
            <Row>
              <Col xs={12} className="actions">
                {this.props.actions.map( action => { return action; })}
              </Col>
            </Row>
          : null }

        </Col>
      </Row>
    );
  }

};

Card.displayName = "Card";
