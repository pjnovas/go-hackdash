
import Icon from "./Icon.js";

export default class Avatar extends React.Component {

  render() {
    
    if (this.props.src){
      return (
        <img src={this.props.src} className="avatar" />
      );
    }

    return (
      <div className="avatar iconic">
        <Icon name="user" />
      </div>
    );
  }

};

Avatar.displayName = "Avatar";
