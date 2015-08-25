
import {Link} from "react-router";
import Header from "./Header.jsx";

export default class Home extends React.Component {

  render() {
    return (
      <div className="not-found">
        <Header ref="header" />

        <div className="content">
          <div className="text-vcenter call-action">
            <h1>404</h1>
            <h2>{__.notfound_message}</h2>
            <Link to="home">{__.notfound_go_home}</Link>
          </div>
        </div>
      </div>
    );
  }

};
