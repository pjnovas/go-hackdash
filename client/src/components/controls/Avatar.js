
export default class Avatar extends React.Component {

  render() {
    // TODO: if no src put a nice icon

    return (
      <img src={this.props.src} className="avatar" />
    );
  }

};

Avatar.displayName = "Avatar";
