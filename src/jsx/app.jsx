import React from 'react'
import EmailEditor from './emailEditor.jsx'

export default class App extends React.Component
{
    constructor(props) {
        super(props);
        this.EmailEditorElement = React.createRef();

        this._onChangeEmailEditor = this._onChangeEmailEditor.bind(this);
        this._onClickAddRandomEmail = this._onClickAddRandomEmail.bind(this);
        this._onClickGetEmailCount = this._onClickGetEmailCount.bind(this);
    }

    render(){
        return (
            <div className="inviter">
                <div className="body">
                    <div className="body__title"><span>Share </span><span className="body__board-name">Board name</span><span> with other</span></div>
                    <EmailEditor 
                        ref={this.EmailEditorElement} 
                        onChange={this._onChangeEmailEditor} 
                        emails={["sidorov@gmail.com"]} />
                </div>
                <div className="buttonpane">
                    <button className="buttonpane__button" onClick={this._onClickAddRandomEmail}>Add email</button>
                    <button className="buttonpane__button" onClick={this._onClickGetEmailCount}>Get email count</button>
                </div>
            </div>
        )
    }

    _onChangeEmailEditor(value){
        this._validEmails = value;
    }

    _onClickAddRandomEmail(){        
        this.EmailEditorElement.current.addEmail(this._randomString(8) + "@" + this._randomString(5) + "." + this._randomString(3));        
    }

    _onClickGetEmailCount(){
        alert(this._validEmails.length);
    }

    _randomString(maxLength) {  
        var text = "",
            length = Math.ceil(Math.random() * (maxLength - 1) + 1);
        var possible = "abcdefghijklmnopqrstuvwxyz";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}