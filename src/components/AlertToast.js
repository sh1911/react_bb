 
import React, {Component} from 'react';

export default class AlertToast extends Component {
    render() {
        return (
                <div className={`${this.props.type === "success" ? "alert alert-success col-7 mx-auto" : "alert alert-danger col-7 mx-auto"}`} show={this.props.show}>
                     <strong className="mr-auto">{this.props.hmessage} : {this.props.message}</strong>                     
            </div>
        );
    };
}