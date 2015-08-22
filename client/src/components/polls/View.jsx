
import Header from "../Header.jsx";
import {PollActions} from "../../actions";
import {PollStore} from '../../stores';

import { ButtonLink } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export default class PollView extends React.Component {

  constructor(props) {
    super(props);
    this.state = PollView.defaultState;
  }

  componentDidMount() {
    this.evChangePoll = PollStore.addListener(this.onChangePolls.bind(this));
    PollActions.findOne(this.props.params.id);
  }

  componentWillUnmount() {
    this.evChangePoll.remove();
  }

  onChangePoll(){
    let poll = PollStore.getStateById();
    this.setState({ poll, loading: false });
  }

  render() {
    <div>
      <Header />
      { this.state.loading ? __.loading :
        <div>
          <h1>{this.state.poll.title}</h1>
        </div>
      }
    </div>
  }

};

PollView.displayName = "PollView";
PollView.defaultState = {
  poll: null,
  loading: true
};
