
import { Input, Row, Col, FormControls, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Divider, Icon } from "../controls";

export default class PollForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = PollForm.defaultState;
  }

  changeProp(prop, value){
    //TODO: validations
    this.props.onChange(prop, value);
  }

  render() {
    let pollURI = window.location.origin + "/polls/" + this.props.token;

    return (
      <form className="poll-form">

        <Row>
          <Col xs={12} sm={10} smOffset={1}>

            { this.props.id ?
              <FormControls.Static label={__.poll_dashboard_domain} value={this.props.dashboard}/>
            :
              <Input type="text" label={__.poll_dashboard_domain}
                placeholder={__.poll_dashboard_domain_hint}
                onChange={ e => this.changeProp("dashboard", e.target.value) }
                value={this.props.dashboard} />
            }

            <Input type="text" label={__.poll_title}
              placeholder={__.poll_title_hint}
              onChange={ e => this.changeProp("title", e.target.value) }
              value={this.props.title} />

            <Input type="checkbox" label={__.poll_isPublic}
              checked={this.props.isPublic ? true : false }
              onChange={ e => this.changeProp("isPublic", e.target.checked) }/>

            <Input type="checkbox" label={__.poll_open}
              checked={this.props.open ? true : false }
              onChange={ e => this.changeProp("open", e.target.checked) }/>


          { this.props.id && this.props.token ?
            <form className="form-horizontal">
              <Divider/>

              <FormControls.Static labelClassName="col-xs-3" wrapperClassName="col-xs-9"
                label={__.poll_access_via_url}>
                <a href={pollURI}>{pollURI}</a>

                <OverlayTrigger placement='top' overlay={<Tooltip>{__.poll_token_refresh}</Tooltip>}>
                  <Button onClick={ e => {this.props.onGenerateToken(); }}>
                    <Icon name="refresh" />
                  </Button>
                </OverlayTrigger>

              </FormControls.Static>
            </form>
          : null }

          </Col>
        </Row>

      </form>
    );
  }

};

PollForm.displayName = "PollForm";

PollForm.defaultState = {

};
