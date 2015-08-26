
import {PollActions} from "../../actions";

import { ButtonLink } from "react-router-bootstrap";
import { Button, Row, Col, OverlayTrigger, Tooltip, Label } from "react-bootstrap";
import {Icon} from "../controls";

export default class PollViewHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = PollViewHeader.defaultState;
    this.timer = null;
    this.lastVotes = null;
  }

  componentDidMount(){
    this.lastVotes = this.props.model && this.props.model.votes;
  }

  shouldComponentUpdate(nextProps) {
    let votes = nextProps.poll && nextProps.poll.votes || [];
    let cVotes = 0;
    votes.forEach( vote => cVotes += vote.votes );

    if (cVotes !== this.lastVotes){
      this.setState({ newVote: true });

      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.setState({ newVote: false }), 2000);

      this.lastVotes = cVotes;
    }

    return true;
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

            <OverlayTrigger placement='bottom' overlay={(
                <Tooltip>{ this.props.autosort ? __.polls_autosort_enabled : __.polls_autosort_disabled }</Tooltip>
              )}>

              <a onClick={ () => this.props.onToggleAutoSort() }
                className={ this.props.autosort ? "autosort-enabled" : "autosort-disabled" } >
                  <Icon name="sort-numeric-desc" />
              </a>
            </OverlayTrigger>

          </h2>

          <div className="counters">
            <div className="count-wrap projects">
              <div className="back">
                <div className="count">{cProjects}</div>
                <div className="title">{__.poll_counter_projects}</div>
              </div>
            </div>
            <div className={"count-wrap votes " + (this.state.newVote ? "highlight" : "")}>
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
  dashboard: null,
  newVote: false
};
PollViewHeader.defaultState = {

};
