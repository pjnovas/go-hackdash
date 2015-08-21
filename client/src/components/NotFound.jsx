import {Link} from "react-router";

export default class Home extends React.Component {

  render() {
    return (
      <div className="inner not-found">
        <p className="lead">Not Found!</p>
        <Link to="home">Go Home</Link>
      </div>
    );
  }

};
