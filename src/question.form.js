import React from "react";
import {SelectList} from "./selectlist.form.js";

export class QuestionForm extends React.Component{
    constructor(props){
        super(props);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectListChange = this.handleSelectListChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
        this.state = {
            list:[],
            number:1,
            type:"",
            text:"",
            choices:[]
        };
    }
    handleNumberChange(e){
        this.setState({"number":e.target.value});
    }
    handleTextChange(e){
        this.setState({"text":e.target.value});
    }
    handleSelectChange(e){
        this.setState({"type":e.target.value});
    }
    handleSelectListChange(newChoices){
        this.setState({"choices":newChoices});
    }
    handleSubmit(e){
        e.preventDefault();
        const newItem = {
            number:this.state.number,
            type:this.state.type,
            text:this.state.text,
            choices:this.state.choices,
            time:Date.now()
        };
        const newList = this.state.list.concat(newItem);

        // 設問並び替え（時刻が新しい方を優先）
        newList.sort((a,b)=>{
            return a.number > b.number || a.number == b.number && a.time < b.time;
        });
        // 設問番号割り当て
        newList.forEach((item,index,array)=>{
            item.number = index + 1;
        });
        this.setState({
            list:newList,
            number:newList.length + 1,
            text:"",
            type:"",
            choices:[]
        });
    }
    handleDeleteQuestion(e){
        const deleteNumber = Number(e.target.name);
        const newList = this.state.list;
        // 該当要素削除
        newList.forEach((item,index,array)=>{
            if(item.number===deleteNumber){
                array.splice(index,1);
            }
        });
        // 設問番号割り当て
        newList.forEach((item,index,array)=>{
            item.number = index + 1;
        });
        this.setState({
            list:newList,
            number:newList.length + 1,
            text:"",
            type:"",
            choices:[]
        });
    }
    render(){
        // 設問リスト表示（仮）
        const questionList = this.state.list.map(item => {
            const key = item.number;
            const choiceList= item.choices.map(choice=>{
                return (
                    <div key={"choice" + choice.number + ":" + choice.time}>
                        <label className="col-sm-2 col-form-label text-center">選択肢 {choice.number}</label>
                        <label className="col-sm-10 col-form-label">{choice.text}</label>
                    </div>
                )
            });
            let typeName;
            switch(item.type){
                case "one":
                    typeName = "択一形式";
                    break;
                case "multi":
                    typeName = "複数選択";
                    break;
                default:
                    typeName = "選択肢なし";
                    break
            }
            return (
                <li key={"question" + item.number + ":" + item.time} className="list-group-item">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-center">設問番号</label>
                        <label className="col-sm-9 col-form-label">{item.number}</label>
                        <div className="col-sm-1 col-form-label">
                            <button type="button" className="badge badge-dark badge-pill" name={item.number} onClick={this.handleDeleteQuestion}>削除</button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-center">設問内容</label>
                        <label className="col-sm-10 col-form-label">{item.text}</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-center">設問形式</label>
                        <label className="col-sm-10 col-form-label">{typeName}</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-center">選択肢</label>
                        <div className="col-sm-10 col-form-label">
                            {choiceList}
                        </div>
                    </div>
                </li>
            )
        });
        let selectList;
        if(this.state.type === "one" || this.state.type === "multi"){
            selectList = <SelectList choices={this.state.choices} onChange={this.handleSelectListChange} />
        }

        return(
            <div>
                <h4 className="text-center">設問作成フォーム</h4>
                <ul className="list-group">
                    {questionList}
                    <li className="list-group-item">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label text-center">設問番号</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control w-25" name="number" value={this.state.number} min="1" onChange={this.handleNumberChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label text-center">設問内容</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="3" placeholder="設問を入力してください" value={this.state.text} onChange={this.handleTextChange} required></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label text-center">設問形式</label>
                                <div className="col-sm-10">
                                    <select className="form-control w-25" value={this.state.type} onChange={this.handleSelectChange} required>
                                        <option value="" disabled>設問形式を選択してください</option>
                                        <option value="one">択一形式</option>
                                        <option value="multi">複数選択</option>
                                        <option value="none">選択肢なし</option>
                                    </select>
                                </div>
                            </div>
                            {selectList}
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">設問登録(追加)</button>
                            </div>
                        </form>
                    </li>
                </ul>
            </div>
        )
    }
}