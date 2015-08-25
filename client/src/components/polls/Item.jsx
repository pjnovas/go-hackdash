
import {PollActions} from "../../actions";

import { ButtonLink } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { Card, Icon } from "../controls";

export default class PollItem extends React.Component {

  render() {
    let model = this.props.poll;

    let actions = [
      (<ButtonLink bsStyle="link" to="poll" params={{ id: model.id }}>
        {__.polls_card_open}
      </ButtonLink>)
    ];

    if (!this.props.readOnly){
      actions.push(
        <Button bsStyle="link" onClick={ () => this.props.onEditClicked(model.id) }>
          {__.polls_card_edit}
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
