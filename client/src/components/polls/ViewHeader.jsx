
import {PollActions} from "../../actions";

import { ButtonLink } from "react-router-bootstrap";
import { Button, Row, Col, OverlayTrigger, Tooltip, Label } from "react-bootstrap";

export default class PollViewHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = PollViewHeader.defaultState;
  }

  render() {
    let poll = this.props.poll;
    let dashboard = this.props.dashboard;

    let baseURI = "https://hackdash.org";
    let dashURI = baseURI + "/dashboards/" + poll && poll.dashboard;

    let isClosed = !poll.open;

    let votes = poll && poll.votes || [];
    let projects = dashboard && dashboard.projects;

    let cProjects = projects && projects.length || 0;

    let cVotes = 0;
    votes.forEach( vote => cVotes += vote.votes );

    return (
      <Row className="poll-header">
        <Col xs={12} className="wrap">

          <h1>{poll.title}
            { isClosed ?
              <OverlayTrigger placement='bottom' overlay={(<Tooltip>{__.poll_closed_hint}</Tooltip>)}>
                <Label bsStyle="danger">{__.poll_closed}</Label>
              </OverlayTrigger>
            : null }
          </h1>
          <h2>
            <a href={dashURI} target="_blank">{poll.dashboard}</a>
          </h2>

          <div className="counters">
            <div className="count-wrap projects">
              <div className="back">
                <div className="count">{cProjects}</div>
                <div className="title">{__.poll_counter_projects}</div>
              </div>
            </div>
            <div className="count-wrap votes">
              <div className="back">
                <div className="count">{cVotes}</div>
                <div className="title">{__.poll_counter_votes}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }

};

PollViewHeader.displayName = "PollViewHeader";
PollViewHeader.defaultProps = {
  poll: null,
  dashboard: null
};
PollViewHeader.defaultState = {

};
