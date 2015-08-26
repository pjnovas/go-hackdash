
import Header from "./Header.jsx";
import Latest from "./polls/Latest.jsx";

import { Grid, Row, Col, Button } from "react-bootstrap";
import { Icon } from "./controls";

import {Link, Element, scroller, scrollSpy} from 'react-scroll';

import {PollActions} from '../actions';
import {PollStore} from '../stores';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = Home.defaultState;
  }

  componentDidMount(){
    document.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler() {
    if (scrollSpy.currentPositionY() > 100){
      this.setState({ searchbox: true });
    }
    else {
      this.setState({ searchbox: false });
    }
  }

  onCreateClick() {
    if (window.user){
      window.app.router.transitionTo("polls");
    }
    else {
      this.refs.header.showLoginModal();
    }
  }

  onSearch(value){
    this.setState({ search: value });
    PollStore.clear();
    PollActions.latest(value);
  }

  onFocusSearch(){
    scroller.scrollTo("latests", true, 500, -55);
  }

  render() {

    return (
      <div className="landing">
        <Header ref="header" searchbox={this.state.searchbox}
          search={this.state.search}
          onSearch={ value => this.onSearch(value) }
          onFocus={ () => this.onFocusSearch() } />

        <div className="landing-header">
          <div className="text-vcenter call-action">

            <div className="logo"></div>

            <h1>{__.app_title}</h1>
            <h2>{__.landing_legend}</h2>

            <Grid fluid>

              <Row>
                <Col xs={12}>
                  <Link to="latests" spy={true} smooth={true} duration={1000} offset={-55}>
                    <Button bsSize="large" className="btn-continue">
                      <Icon name="angle-down" />
                    </Button>
                  </Link>
                </Col>
              </Row>

            </Grid>

          </div>
        </div>

        <Element name="latests" className="latest-polls">
          <Latest onCreateClick={ () => this.onCreateClick() } />
        </Element>

        <div className="footer">

        </div>

      </div>
    );
  }

};

Home.displayName = "Home";
Home.defaultState = {
  showLogin: false,
  searchbox: false,
  search: ""
};
