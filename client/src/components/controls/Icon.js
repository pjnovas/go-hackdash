
export default class Icon extends React.Component {

  render() {
    let icon = this.props.name;
    let type = this.props.type || "fa";

    switch (type){
      case "fa":
        return (<i className={"fa fa-" + icon}></i>);
      case "mui":
        return (<i className={"zmdi zmdi-" + icon}></i>);
    }

  }

};

Icon.displayName = "Icon";
