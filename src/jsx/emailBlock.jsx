import React from 'react'

export default class EmailBlock extends React.Component
{
    constructor(props) {
        super(props);        
    }

    render(){
        return(
            <div className={this._getClassName()}>
                <div className="email_editor__block__text">{this.props.text}</div> 
                <div className="email_editor__block__close_button" onClick={this.props.onClose.bind(this)}></div> 
            </div>
        )
    }

    _getClassName(){
        var className = "email_editor__block";
        if(!this._isValidEmail()){
            className += " invalid";
        }
        return className;
    }

    _isValidEmail(){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.props.text);
    }

    _onClickCloseButton(){
        //проверяем есть ли текст и формируем блок на основе этого
    }
}