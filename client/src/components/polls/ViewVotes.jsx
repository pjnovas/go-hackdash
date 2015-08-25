
import _ from 'lodash';

import {PollActions} from "../../actions";
import {PollStore} from '../../stores';

import ProjectVote from './ProjectVote.jsx';

import { ButtonLink } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export default class PollViewVotes extends React.Component {

  constructor(props) {
    super(props);
    this.state = PollViewVotes.defaultState;
  }

  componentWillMount(){
    this.updateState();
    this.evChangePoll = PollStore.addListener(this.updateState.bind(this));
  }

  componentWillUnmount() {
    this.evChangePoll.remove();
  }

  updateState(){
    if (this.props.votes && this.props.projects){
      let votes = this.props.votes;

      let projectVotes = this.props.projects.map( p => {

        let found = _.findWhere(votes, { projectId: p._id }) || {};

        return _.assign(_.cloneDeep(p), {
          votes: found.votes || 0,
          voted: found.voted || false
        });
      });

      this.setState({ projectVotes });
    }
  }

  render() {
    let poll = this.props.poll;
    let pollId = poll.isPublic ? poll.id : poll.token;
    let canVote = poll && poll.open ? true : false;

    if (this.props.autosort){
      this.state.projectVotes.sort((a, b) => b.votes - a.votes);
    }
    else {
      this.state.projectVotes.sort((a, b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
      });
    }

    return (
      <div className="votes-ctn">
        { this.state.projectVotes.map( pVote => {
          return (
            <div className="card-wrap">
              <ProjectVote key={pVote._id} model={pVote}
                pollId={pollId} canVote={canVote} />
            </div>
          );
        } )}
      </div>
    );
  }

};

PollViewVotes.displayName = "PollViewVotes";
PollViewVotes.defaultProps = {
  votes: null,
  projects: null,
  autosort: false
};
PollViewVotes.defaultState = {
  projectVotes: []
};
