import React from 'react'
import EmailBlock from './emailBlock.jsx'

export default class EmailEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: props.emails || [],
            text: ""
        };

        this._validEmails = [];

        this._onClickEmailEditor = this._onClickEmailEditor.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onBlurInput = this._onBlurInput.bind(this);
        this._onPasteText = this._onPasteText.bind(this);
        this._onChangeText = this._onChangeText.bind(this);
    }

    render() {
        return (
            <div className="email-editor" onClick={this._onClickEmailEditor}>
                {this._createEmailBlocks()}
                <textarea ref="emailInput" className="email-editor__input" placeholder="add more people..."
                    onKeyDown={this._onKeyDown}
                    onBlur={this._onBlurInput}
                    onPaste={this._onPasteText}
                    onChange={this._onChangeText}
                    value={this.state.text}
                ></textarea>
            </div>
        )
    }

    componentDidMount() {
        this.props.onChange(this._validEmails);
    }

    componentDidUpdate() {
        this.props.onChange(this._validEmails);
    }

    _createEmailBlocks() {
        var emailValues = this.state.emails;

        this._validEmails = [];
        return (emailValues.map((value, i) => this._eachEmailBlock(value, i)))

    }

    _eachEmailBlock(value, i) {
        var isValidEmail = this._isValidEmail(value);
        if (isValidEmail) {
            this._validEmails.push(value);
        }

        return <EmailBlock key={i} text={value} onClose={() => this._onCloseEmailBlock(i)} isValid={isValidEmail} />
    }

    _isValidEmail(value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    addEmail(email) {
        if (email) {
            this.setState(state => ({
                emails: [...state.emails, email],
                text: ""
            }));
        }
    }

    _onClickEmailEditor() {
        this.refs.emailInput.focus();
    }

    _onCloseEmailBlock(i) {

        this.setState(state => {
            var emails = [...state.emails];

            emails.splice(i, 1);
            return ({
                emails: emails,
                text: ""
            })
        });
    }

    _onBlurInput(ev) {
        var text = ev.target.value;
        this.addEmail(text);
    }

    _onChangeText(ev) {
        var text = ev.target.value;

        this.setState(state => ({
            text: text
        }));
    }

    _onKeyDown(ev) {
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

    _onPasteText(ev) {
        var text = ev.clipboardData.getData("Text") || "",
            textBlocks = text.split(/[,;\s]/g);

        ev.preventDefault();

        if (blocks.length > 0) {
            this.setState(state => ({
                emails: [...state.emails, ...textBlocks],
                text: ""
            }));
        }
    }
}