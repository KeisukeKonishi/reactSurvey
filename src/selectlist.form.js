import React from "react";

export class SelectList extends React.Component{
    constructor(props){
        super(props);
        this.handleChangeListText = this.handleChangeListText.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
        this.handleAddListText = this.handleAddListText.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.state = {
            list:[],
            number:1,
            text:""
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            "list":nextProps.choices,
            "number":nextProps.choices.length + 1,
            "text":""
        });
    }
    handleAddListText(e){
        this.setState({"text":e.target.value});
        const newItem = {
            number:Number(e.target.name),
            text:e.target.value,
            time:Date.now()
        };
        const newList = this.state.list.concat(newItem);
        // 該当要素削除
        newList.forEach((item,index,array)=>{
            if(item.number===newItem.number && item.time != newItem.time){
                array.splice(index,1);
            }
        });
        // 設問並び替え（時刻が新しい方を優先）
        newList.sort((a,b)=>{
            return a.number > b.number;
        });
        this.setState({"list":newList});
    }
    handleChangeListText(e){
        const changeNumber = Number(e.target.name);
        const changeList = this.state.list;
        // 該当要素変更
        changeList.forEach((item,index,array)=>{
            if(item.number === changeNumber){
                item.text = e.target.value;
                item.time = Date.now();
            }
        });
        this.props.onChange(changeList);
        // this.setState({"list":changeList});
    }
    handleAddList(){
        this.props.onChange(this.state.list);
    }
    handleDeleteList(e){
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
        this.props.onChange(newList);
    }
    render(){
        console.log(this.state.list);
        // 作成中の選択肢は重複するので入れない
        const choiceList = this.state.list.map(item=>{
            if(item.number != this.state.number){
                return(
                    <li key={item.number} className="form-group row">
                        <label className="col-sm-2 col-form-label text-center">選択肢 {item.number}</label>
                        <input className="col-sm-9 form-control" name={item.number} value={item.text} onChange={this.handleChangeListText} required/>
                        <div className="col-sm-1">
                            <button type="button" className="badge badge-dark badge-pill" name={item.number} onClick={this.handleDeleteList}>削除</button>
                        </div>
                    </li>
                )
            }
        });
        // 1.登録済アイテム(選択肢・設問)の編集　2.DBへの登録 3アンケート回答（番号入力＆フォーム表示）
        // <label className="col-sm-9 col-form-label">{item.text}</label>
        return(
            <div className="form-group row">
                <label className="col-sm-2 col-form-label text-center">選択肢</label>
                <div className="col-sm-10">
                    <ul className="form-control">
                        {choiceList}
                        <li className="form-group row">
                            <label className="col-sm-2 col-form-label text-center">選択肢 {this.state.number}</label>
                            <input className="col-sm-9 form-control" value={this.state.text} name={this.state.number} onChange={this.handleAddListText} placeholder="選択肢を入力してください"/>
                            <div className="col-sm-1">
                                <button type="button" className="badge badge-dark badge-pill" name={this.state.number} onClick={this.handleDeleteList}>クリア</button>
                            </div>
                        </li>
                        <li className="form-group row">
                            <div className="col-sm-3">
                                <button type="button" className="btn btn-primary" onClick={this.handleAddList} disabled={!this.state.text}>選択肢登録</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}