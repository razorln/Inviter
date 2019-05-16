import React from 'react'

export default class EmailBlock extends React.Component
{
    constructor(props) {
        super(props);        
    }

    render(){
        return(
            <div className={this._getClassName()}>
                <div className="email-block__text">{this.props.text}</div> 
                <div className="email-block__close-button" onClick={this.props.onClose}></div> 
            </div>
        )
    }

    _getClassName(){
        var className = "email-block";
        if(!this.props.isValid){
            className += "--invalid";
        }
        return className;
    }
}