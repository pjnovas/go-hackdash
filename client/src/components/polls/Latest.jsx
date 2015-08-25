
import Header from "../Header.jsx";
import PollList from "./List.jsx";

import {PollStore} from '../../stores';
import {PollActions} from '../../actions';

import { Grid, Row, Col, Button } from "react-bootstrap";

export default class LatestPolls extends React.Component {

  constructor(props) {
    super(props);
    this.state = LatestPolls.defaultState;
  }

  componentDidMount() {
    this.evChangePoll = PollStore.addListener(this.onChangePolls.bind(this));
    PollStore.clear();
    PollActions.latest();
  }

  componentWillUnmount() {
    PollStore.clear();
    this.evChangePoll.remove();
  }

  onChangePolls(){
    let polls = PollStore.getState();
    this.setState({ polls, loading: false });
  }

  render() {

    return (
      <div className="polls-ctn">
        <Grid>

          <Row>

            <Col xs={6} sm={6} smOffset={1}>
              <h3>{__.landing_latest_polls}</h3>
            </Col>

            <Col xs={6} sm={4}>
              <Button bsSize="large" className="btn-create pull-right"
                onClick={ () => this.props.onCreateClick() }>
                {__.landing_create_poll}
              </Button>
            </Col>

          </Row>

        </Grid>

        { this.state.loading ? __.loading :
          <PollList readOnly={true} polls={this.state.polls} />
        }
      </div>
    );
  }

};

LatestPolls.displayName = "LatestPolls";
LatestPolls.defaultState = {
  polls: [],
  loading: false //TODO: show a loading
};
