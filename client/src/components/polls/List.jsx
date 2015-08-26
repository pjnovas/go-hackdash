
import PollItem from "./Item.jsx";
import {PollActions} from "../../actions";

import PollModal from "./PollModal.jsx";

import { Grid, Row, Col } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class PollList extends React.Component {

  constructor(props){
    super(props);
    this.state = PollList.defaultState;
  }

  showEdit(id){
    this.setState({ showPollModal: true, editId: id });
  }

  removeItem(id){
    PollActions.remove(id);
  }

  render() {

    return (
      <Grid fluid>

        <Row>
          <Col xs={12}>
            { this.props.polls.map(poll => {
              return (
                <div className="card-wrap">
                  <PollItem key={poll.id} poll={poll} readOnly={this.props.readOnly}
                    onEditClicked={ id => this.showEdit(id) }
                    onRemoveClicked={ id => this.removeItem(id) }/>
                </div>
              );
            })}
          </Col>
        </Row>

        { this.props.readOnly ? null :
        <Row>
          <Col xs={12}>
            { !this.props.polls.length ?
              <p className="empty-polls">{__.polls_empty_legend}</p>
            : null }
          </Col>
        </Row>
        }

        { this.props.readOnly ? null :
        <ActionButton bsStyle="primary" icon="plus"
          onClick={ () => this.setState({ showPollModal: true }) } />
        }

        {this.state.showPollModal ?
        <PollModal
          show={this.state.showPollModal}
          id={this.state.editId}
          onClose={ () => this.setState({ showPollModal: false, editId: null }) } />
        : null }

      </Grid>
    );
  }

};

PollList.displayName = "PollList";
PollList.defaultState = {
  showPollModal: false,
  editId: null
};
