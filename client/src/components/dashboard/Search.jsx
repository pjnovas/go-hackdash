
import {HackdashStore} from "../../stores";
import {HackdashActions} from "../../actions";

import { Input } from "react-bootstrap";
import { Divider } from "../controls";

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = Search.defaultState;
  }

  componentDidMount() {
    this.evChangeHackdash = HackdashStore.addListener(this.onChangeHackdash.bind(this));
  }

  componentWillUnmount() {
    HackdashStore.clear();
    this.evChangeHackdash.remove();
  }

  onChangeHackdash(){
    let dashboards = HackdashStore.getState();
    this.setState({ dashboards });
  }

  onType(value){
    HackdashStore.clear();
    this.setState({ value });

    if (!value.length){
      this.setState({ dashboards: [] });
      return;
    }

    HackdashActions.find(this.state.value);
  }

  onSelect(dashboard) {
    this.props.onSelect(dashboard);
    this.setState({ value: dashboard.domain, dashboards: [] });
  }

  render() {

    return (
      <div className="dashboard-typeahead">

        <Input type="text" label={this.props.label}
          placeholder={this.props.placeholder}
          onChange={ e => this.onType(e.target.value) }
          value={this.state.value} />

        { this.state.dashboards.length ?
          <div className="dropdown open">
            <ul className="dropdown-menu">

              { this.state.dashboards.map( dash => {
                return (
                  <li key={dash.domain}>
                    <a onClick={ () => this.onSelect(dash) }>
                      <label>{dash.domain}</label><span>{dash.title}</span>
                    </a>
                  </li>);
              })}

            </ul>
          </div>
        : null }

      </div>
    );
  }

};

Search.displayName = "Search";
Search.defaultProps = {
  placeholder: "",
  label: ""
};
Search.defaultState = {
  value: "",
  dashboards: []
};
