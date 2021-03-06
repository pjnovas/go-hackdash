
import _ from "lodash";

import {PollActions} from "../../actions";
import {PollStore} from "../../stores";

import {HackdashActions} from "../../actions";
import {HackdashStore} from "../../stores";

import Header from "../Header.jsx";
import PollHeader from "./ViewHeader.jsx";
import PollVotes from "./ViewVotes.jsx";

import { Grid } from "react-bootstrap";

export default class PollView extends React.Component {

  constructor(props) {
    super(props);
    this.state = PollView.defaultState;
  }

  componentDidMount() {
    this.evChangePoll = PollStore.addListener(this.onChangePolls.bind(this));
    this.evErrorPoll = PollStore.onError(this.onError.bind(this));
    this.evChangeHackdash = HackdashStore.addListener(this.onChangeHackdash.bind(this));

    PollActions.findOne(this.props.params.id);
  }

  componentWillUnmount() {
    this.evChangePoll.remove();
    this.evErrorPoll.remove();
    this.evChangeHackdash.remove();

    PollActions.leaveRoom(this.props.params.id);
  }

  onError(error){
    if (error.status === 404){
      window.location = "/notfound";
    }
  }

  onChangePolls(){
    let poll = PollStore.getStateById(this.props.params.id);

    if (!poll){
      // try to find by Token
      let polls = PollStore.getState();
      poll = _.findWhere(polls, { token: this.props.params.id });

      if (!poll){
        throw new Error("Could not find the Poll");
      }
    }

    this.setState({ poll, loading: false });

    let dash = this.state.poll.dashboard;
    if (!this.state.fetchingDashboard && this.state.loadingDashboard && dash){
      this.setState({ fetchingDashboard: true });
      HackdashActions.findOne(dash);
    }

    setTimeout(() => PollActions.joinRoom(poll.id), 100);
  }

  onChangeHackdash(){
    let dashboard = HackdashStore.getStateById(this.state.poll.dashboard);
    this.setState({ dashboard });

    if (dashboard.projects){
      this.setState({ dashboard, loadingDashboard: false });
    }
  }

  onToggleAutoSort() {
    this.setState({ autosort: !this.state.autosort })
  }

  render() {
    let poll = this.state.poll;
    let dash = this.state.dashboard;

    let votes = poll && poll.votes;
    let projects = dash && dash.projects;

    return (
      <Grid fluid>
        <Header />

        { this.state.loading ? __.loading :
          <PollHeader poll={poll} dashboard={dash} autosort={this.state.autosort}
            onToggleAutoSort={ () => this.onToggleAutoSort() }/>
        }

        { this.state.loadingDashboard ? __.loading :
          <PollVotes poll={poll} votes={votes} projects={projects} autosort={this.state.autosort}/>
        }
      </Grid>
    );
  }

};

PollView.displayName = "PollView";
PollView.defaultState = {
  poll: null,
  dashboard: null,
  loading: true,
  loadingDashboard: true,
  fetchingDashboard: false,
  autosort: false
};
