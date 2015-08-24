
import {PollActions} from "../../actions";

import { Button } from "react-bootstrap";
import { Card, Icon } from "../controls";

export default class ProjectVote extends React.Component {

  constructor(props) {
    super(props);
    this.state = ProjectVote.defaultState;
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

    return (
      <Card
        triangle={model.votes}
        triangleIcon="thumbs-up"
        title={model.title}
        description={model.description}
        media={ baseURI + model.cover }
        actions={(actions)}>
      </Card>
    );
  }

};

ProjectVote.displayName = "ProjectVote";
ProjectVote.defaultProps = {
  model: {}
};
ProjectVote.defaultState = {

};
