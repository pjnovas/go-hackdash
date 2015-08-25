
import { Modal } from "react-bootstrap";
import LoginButtons from "./LoginButtons.jsx";

export default class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginModal.defaultState;
  }

  render() {

    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>

        <Modal.Header closeButton>
          <Modal.Title>{__.account_login}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginButtons />
        </Modal.Body>

      </Modal>
    );
  }

};

LoginModal.displayName = "LoginModal";
LoginModal.defaultState = {

};
