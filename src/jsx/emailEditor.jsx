import React from 'react'
import EmailBlock from './emailBlock.jsx'

export default class EmailEditor extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { 
            emails: [],
            text: ""
        };
        this._countValidElement = 0;
    }

    render(){
        return(
            <div className="email_editor" onClick={this._onClickEmailEditor.bind(this)}>
                {this._createEmailBlocks()}
                <textarea ref="emailInput" className="email_editor__input" placeholder="add more people..."
                    onKeyDown={this._onKeyDown.bind(this)} 
                    onBlur={this._onBlurInput.bind(this)}
                    onPaste={this._onPasteText.bind(this)}
                    onChange={this._onChangeText.bind(this)}
                    value={this.state.text}
                ></textarea>
            </div>
        )
    }

    componentDidMount(){
        this.props.onCreatedEmailBlocks(this._countValidElement);
    }

    componentDidUpdate(){
        this.props.onCreatedEmailBlocks(this._countValidElement);
    }

    _createEmailBlocks(){
        var emailValues = this.state.emails;

        
        this._countValidElement = 0;
        return(emailValues.map(this._eachEmailBlock.bind(this)))

    }

    _eachEmailBlock(value, i){
        var isValid = this._isValidEmail(value);
        this._countValidElement += isValid ? 1 : 0;

        return <EmailBlock key={i} text={value} onClose={this._onCloseEmailBlock.bind(this, i)} isValid={this._isValidEmail(value)}/>
    }

    _isValidEmail(value){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    addRandomEmail(value){
        if(value){
            this.setState(state => ({
                emails: [...state.emails, value],
                text: ""
              }));
        }
    }

    _onClickEmailEditor(){
        this.refs.emailInput.focus();
    }

    _onCloseEmailBlock(i){        

        this.setState(state => {
            var emails = [...state.emails];

            emails.splice(i, 1);
            return ({
                emails: emails,
                text: ""
            })
        });
    }

    _onBlurInput(ev){
        var text = ev.target.value;
        if(text){
            this.setState(state => ({
                emails: [...state.emails, text],
                text: ""
              }));
        }
    }

    _onChangeText(ev){
        var text = ev.target.value;
        
        this.setState(state => ({
            text: text
        }));
    }

    _onKeyDown(ev){
        var text = ev.target.value,
            isHandledKeyCode = [13, 188].indexOf(ev.keyCode) >= 0;

        if (isHandledKeyCode) {
            ev.preventDefault();

            if (text) {
                this.setState(state => ({
                    emails: [...state.emails, text],
                    text: ""
                }));
            }
        }
    }

    _onPasteText(ev){
        var text = ev.clipboardData.getData("Text") || "",
            blocks = text.split(/[,;\s]/g);

            ev.preventDefault();

            if (blocks.length > 0) {
                this.setState(state => ({
                    emails: [...state.emails, ...blocks],
                    text: ""
                }));
            }
    }
}