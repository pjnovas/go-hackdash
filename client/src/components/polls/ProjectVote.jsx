
import {PollActions} from "../../actions";

import { Button } from "react-bootstrap";
import { Card, Icon } from "../controls";

export default class ProjectVote extends React.Component {

  constructor(props) {
    super(props);
    this.state = ProjectVote.defaultState;
    this.timer = null;
    this.lastVotes = null;
  }

  componentDidMount(){
    this.lastVotes = this.props.model && this.props.model.votes;
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.model && nextProps.model.votes !== this.lastVotes){
      this.setState({ newVote: true });

      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.setState({ newVote: false }), 2000);

      this.lastVotes = nextProps.model.votes;
    }

    return true;
  }

  onVote(){
    PollActions.vote(this.props.pollId, this.props.model._id);
  }

  onUnvote(){
    PollActions.unvote(this.props.pollId, this.props.model._id);
  }

  render() {
    let baseURI = "https://hackdash.org";
    let model = this.props.model;

    let actions = [];

    if(this.props.canVote) {

      if (model.voted){
        actions.push(
          <Button bsStyle="link" className="btn-success voted" onClick={ () => this.onUnvote() }>
            <Icon name="check"/> {__.polls_card_project_unvote}
          </Button>
        );
      }
      else {
        actions.push(
          <Button bsStyle="link" className="btn-primary" onClick={ () => this.onVote() }>
            <Icon name="thumbs-o-up"/> {__.polls_card_project_vote}
          </Button>
        );
      }
    }
    else if (model.voted) {
      actions.push(
        <Button bsStyle="link" className="btn-success disabled">
          <Icon name="check"/> {__.polls_card_project_unvote}
        </Button>
      );
    }

    actions.push(
      <Button bsStyle="link" className="pull-right"
        href={ baseURI + "/projects/" + model._id} target="_blank">
        <Icon name="external-link"/> {__.polls_card_project_open}
      </Button>
    );

    let picUrl = baseURI + model.cover;
    if (!model.cover){
      picUrl = true;
    }

    return (
      <Card highlight={this.state.newVote}
        triangle={model.votes}
        triangleIcon="thumbs-up"
        title={model.title}
        description={model.description}
        media={picUrl}
        actions={(actions)}>
      </Card>
    );
  }

};

ProjectVote.displayName = "ProjectVote";
ProjectVote.defaultProps = {
  model: {},
  newVote: false
};
ProjectVote.defaultState = {

};
