
import Header from "./Header.jsx";

import { ButtonLink } from "react-router-bootstrap";
import { Icon } from "./controls";

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Header hideprofile={true} />
        <h1>LANDING PAGE HERE</h1>

        <ButtonLink bsSize="large" to="login">
          <Icon name="twitter" />
        </ButtonLink>

      </div>
    );
  }

};
