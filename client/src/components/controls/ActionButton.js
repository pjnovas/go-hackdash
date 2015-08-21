
import { Button } from "react-bootstrap";
import { ButtonLink } from "react-router-bootstrap";
import Icon from "./Icon";

export default class ActionButton extends React.Component {

  render() {

    let icon = (<Icon name={this.props.icon} />);

    var mini = this.props.secondary ? " secondary " : "";
    var css = "btn-action " + mini + this.props.className;

    let button = (<Button {...this.props} className={css}>{icon}</Button>);

    if (this.props.to){ // router link
      button = (<ButtonLink {...this.props} className={css}>{icon}</ButtonLink>);
    }

    return (button);
  }

};

ActionButton.displayName = "ActionButton";
