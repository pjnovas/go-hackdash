
import {PollActions} from "../../actions";
import {PollStore} from "../../stores";
import PollForm from "./Form.jsx";

import { Button, Row, Col, Modal, Input, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "../controls";

export default class PollModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = PollModal.defaultState;
  }

  componentDidMount(){
    let model = {
      dashboard: "",
      title: "",
      isPublic: true,
      open: true
    };

    if (this.props.id){
      model = PollStore.getStateById(this.props.id);
      this.evChangePoll = PollStore.addListener(this.onChangePolls.bind(this));
    }

    this.setState({ model });
  }

  componentWillUnmount() {
    this.evChangePoll.remove();
  }

  onChangePolls(){
    if (this.props.id){
      this.setState({ model: PollStore.getStateById(this.props.id) });
    }
  }

  onSave(){
    if (this.state.dirty){
      if (this.props.id){
        PollActions.update(this.props.id, this.state.model);
      }
      else {
        PollActions.create(this.state.model);
      }
    }

    this.setState({ model: {} });
    this.props.onClose();
  }

  onChange(prop, value){
    let model = this.state.model;
    model[prop] = value;
    this.setState({ model, dirty: true });
  }

  onGenerateToken(){
    if (this.props.id){
      PollActions.generateToken(this.props.id);
    }
  }

  render() {

    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>

        <Modal.Header closeButton>
          <Modal.Title>
            { this.props.id ?
              __.polls_edit_title.replace("{1}", this.state.model.dashboard)
              :
              __.polls_create_title
            }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <PollForm {...this.state.model}
            onChange={ (prop, value) => this.onChange(prop, value) }
            onGenerateToken={ () => this.onGenerateToken() }/>

        </Modal.Body>

        <Modal.Footer>

          <Button onClick={this.props.onClose}>{__.close}</Button>

           <Button bsStyle="success" className="pull-right"
              onClick={ e => this.onSave(e) } >
            {__.save}
          </Button>
        </Modal.Footer>

      </Modal>
    );
  }

};

PollModal.displayName = "PollModal";
PollModal.defaultState = {
  model: {},
  dirty: false
};
