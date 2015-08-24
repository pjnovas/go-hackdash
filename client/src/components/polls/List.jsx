
import PollItem from "./Item.jsx";
import PollActions from "../../actions";

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

  render() {

    return (
      <Grid fluid>

        <Row>
          <Col xs={12}>
            { this.props.polls.map(poll => {
              return (
                <div className="card-wrap">
                  <PollItem key={poll.id} poll={poll}
                    onEditClicked={ id => this.showEdit(id) }/>
                </div>
              );
            })}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            { !this.props.polls.length ?
              <span>{__.polls_empty_legend}</span>
            : null }
          </Col>
        </Row>

        <ActionButton bsStyle="primary" icon="plus"
          onClick={ () => this.setState({ showPollModal: true }) } />

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
