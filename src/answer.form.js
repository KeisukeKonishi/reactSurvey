import React from "react";

export class AnswerForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <div className="border border-dark form-group">
                    <h6>設問1</h6>
                    <div className="m-1">
                        <label className="form-control border-0">設問内容です.以下の選択肢より選んでください</label>
                        <div className="btn-group my-1" data-toggle="buttons">
                            <label className="btn btn-outline-primary">
                                <input type="radio" name="options" id="option1"/> 選択肢 1
                            </label>
                            <label className="btn btn-outline-primary">
                                <input type="radio" name="options" id="option2"/> 選択肢 2
                            </label>
                            <label className="btn btn-outline-primary">
                                <input type="radio" name="options" id="option3"/> 選択肢 3
                            </label>
                        </div>
                        <textarea className="form-control" rows="5" placeholder="設問を入力してください"></textarea>
                    </div>
                </div>
                <ul className="pagination">
                    <li className="page-item disabled"><button type="button" className="page-link">前の設問</button></li>
                    <li className="page-item"><button type="button" className="page-link">次の設問</button></li>
                </ul>
                <div className="progress my-2">
                    <div className="progress-bar" role="progressbar" style={{width:"25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
                <button type="button" className="btn btn-success">回答する</button>
            </div>
        )
    }
}