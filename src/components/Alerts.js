import React, { PropTypes } from 'react';

export default class Alerts extends React.Component {

  render() {
    let alertArray = [];
    let alertComponent = this;

    if(this.props.alerts.length > 0){
        this.props.alerts.forEach(function (alertObject, i) {
            let htmlMessage = ""
            if(alertObject.type === 'success'){
                htmlMessage = <div key={i} className="msg success-msg">
                  <i className="fa fa-check"></i>
                  <span className="msg-content">{alertObject.text}</span>
                  <i onClick={alertComponent.props.clearAlerts.bind(this)} className="dismiss fa fa-close"></i>
                </div>
            } else {
                htmlMessage = <div key={i} className="msg error-msg">
                  <i className="fa fa-exclamation-triangle"></i>
                  <span className="msg-content">{alertObject.text}</span>
                  <i onClick={alertComponent.props.clearAlerts.bind(this)} className="dismiss fa fa-close"></i>
                </div>
            }
            alertArray.push(
                htmlMessage
            );
        });
    }

    return (
        <div className="row">
            {alertArray}
        </div>
    );
  }
}

Alerts.propTypes = {
    alerts: PropTypes.array,
    clearAlerts: PropTypes.func
};

Alerts.defaultProps = {
    alerts: [],
    clearAlerts: function(){}
};