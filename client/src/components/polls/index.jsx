
import Header from "../Header.jsx";
import PollList from "./List.jsx";

import {PollStore} from '../../stores';
import {PollActions} from '../../actions';

export default class Polls extends React.Component {

  constructor(props) {
    super(props);
    this.state = Polls.defaultState;
  }

  componentDidMount() {
    this.evChangePoll = PollStore.addListener(this.onChangePolls.bind(this));
    PollActions.find();
  }

  componentWillUnmount() {
    this.evChangePoll.remove();
  }

  onChangePolls(){
    let polls = PollStore.getState();
    this.setState({ polls, loading: false });
  }

  render() {

    return (
      <div className="polls-ctn">
        <Header />
        { this.state.loading ? __.loading :
          <PollList polls={this.state.polls} />
        }
      </div>
    );
  }

};

Polls.displayName = "Polls";
Polls.defaultState = {
  polls: [],
  loading: false //TODO: show a loading
};
