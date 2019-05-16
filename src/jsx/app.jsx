import React from 'react'
import EmailEditor from './emailEditor.jsx'

export default class App extends React.Component
{
    constructor(props) {
        super(props);
        this.EmailEditorElement = React.createRef();
    }

    render(){
        return (
            <div className="inviter">
                <div className="inviter__body">
                    <div className="inviter__title"><span>Share </span><span className="inviter__title__board_name">Board name</span><span> with other</span></div>
                    <EmailEditor ref={this.EmailEditorElement} onCreatedEmailBlocks={this._onCreatedEmailBlocks.bind(this)} />
                </div>
                <div className="inviter__buttonpane">
                    <button className="inviter_button" onClick={this._onClickAddRandomEmail.bind(this)}>Add email</button>
                    <button className="inviter_button" onClick={this._onClickGetEmailCount.bind(this)}>Get email count</button>
                </div>
            </div>
        )
    }

    _onCreatedEmailBlocks(value){
        this._countEmails = value;
    }

    _onClickAddRandomEmail(){        
        this.EmailEditorElement.current.addRandomEmail(this._randomString(8) + "@" + this._randomString(5) + "." + this._randomString(3));
        
    }

    _onClickGetEmailCount(){
        alert(this._countEmails);
    }

    _randomString(length) {  
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}