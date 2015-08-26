
import {PollActions} from "../../actions";

import { ButtonLink } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { Card, Icon } from "../controls";

export default class PollItem extends React.Component {

  onRemoveClicked(){
    let model = this.props.poll;

    if (window.confirm(__.polls_remove_question.replace("%1", model.title))){
      this.props.onRemoveClicked(model.id);
    }
  }

  render() {
    let model = this.props.poll;

    let actions = [
      (<ButtonLink bsStyle="link" className="pull-right" to="poll" params={{ id: model.id }}>
        {__.polls_card_open}
      </ButtonLink>)
    ];

    if (!this.props.readOnly){
      actions.push(
        <Button bsStyle="link" className="btn-warning"
            onClick={ () => this.props.onEditClicked(model.id) }>
          {__.polls_card_edit}
        </Button>
      );

      actions.push(
        <Button bsStyle="link" className="btn-danger"
            onClick={ () => this.onRemoveClicked() }>
          {__.polls_card_remove}
        </Button>
      );
    }

    return (
      <Card
        hletter={model.title.charAt(0)}
        htitle={model.title}
        hsubtitle={model.dashboard}
        actions={(actions)}>
      </Card>
    );
  }

};

PollItem.displayName = "PollItem";
