import React from "react";
import ReactDOM from "react-dom";
import {QuestionForm} from "./question.form.js";

class MainForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand" href="#"> アンケート </a>
                    <div className="justify-content-end">
                        <a className="navbar-brand" href="#"> 管理 </a>
                    </div>
                </nav>
                <div className="container">
                    <QuestionForm />
                </div>
            </div>
        )
    }
}

ReactDOM.render( 
    <MainForm /> ,
    document.getElementById("main-form")
)