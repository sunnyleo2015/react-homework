var jsonData = {items:['text', 'date', 'text'], status: 'editPage'};

var ChooseWinDow = React.createClass({
    closeWindow: function(){
        $(".chooseWindow").hide();
    },
    addItem: function(){
        var itemtype = $("input[name='inputtype']:checked").val();
        if( itemtype == 'text'){
            jsonData.items.push('text');
        }else if(itemtype == 'date'){
            jsonData.items.push('date');
        }
        $(".chooseWindow").hide();
        ReactDOM.render(
            <Content />,
            document.getElementById('content')
        );
    },
    render: function(){
        return (
            <div className="chooseWindow">
                <div className="closeButton" onClick = {this.closeWindow}>X</div>
                <form>
                    text: <input type="radio" name="inputtype" value="text"/>
                    date: <input type="radio" name="inputtype" value="date"/>
                    <button type="button" className="addNewItemButton" onClick={this.addItem}>Add Item</button>
                </form>
            </div>
        );
    }
});

var EditPage = React.createClass({
    removeItem:function(event){
        var index = $(event.currentTarget).data("item-index");;
        alert(index);
        jsonData.items.splice(index,1);
        ReactDOM.render(
            <Content />,
            document.getElementById("content")
        );
    },
    openwindow: function(){
        $(".chooseWindow").show();
        ReactDOM.render(
            <ChooseWinDow />,
            document.getElementById('chooseDialog')
        );
    },
    topreviewPage: function(){
        if(jsonData.status === "editPage"){
            jsonData.status = "previewPage";
        }
        ReactDOM.render(
            <Content />,
            document.getElementById('content')
        );
    },
    render: function(){
        var self = this;
        return(
            <div className="editPage">
                <div className="editPageTitle">editPage</div>
                <div className="formWindows">
                    {
                        jsonData.items.map(function(item,index){
                            if(item === 'text'){
                                return (
                                    <div className="textinput">
                                        text:<input type="text" />
                                            <button className="delete" onClick={self.removeItem} data-item-index={index}> delete</button>
                                    </div>);
                            }else{
                                return(
                                    <div className="textinput ">
                                        date:<input type="date" />
                                        <button className="delete" onClick={self.removeItem} data-item-index={index}> delete</button>
                                    </div>);
                            }
                        })
                    }
                </div>
                <div className="addItemButton" onClick = {this.openwindow}>add</div>
                <div className="toPreviewPage" onClick = {this.topreviewPage}>finish</div>
            </div>
        );
    }
});


var PreviewPage = React.createClass({
    toeditPage: function(){
        if(jsonData.status === "previewPage"){
            jsonData.status = "editPage";
        }
        ReactDOM.render(
            <Content />,
            document.getElementById('content')
        );
    },
    render: function (){
        return (
            <div className="previewPage">
                <div className="previewPageTitle">previewPage</div>
                <div className="previewWindos">
                    {
                        jsonData.items.map(function(item){
                            if(item === 'text'){
                                return (
                                    <div className="previewInput">
                                        text:<input type="text" disabled="true"/>
                                    </div>);
                            }else{
                                return(
                                    <div className="previewDate">
                                        date:<input type="date" disabled="true"/>
                                    </div>);
                            }
                        })
                    }
                </div>
                <div className="toEditPage" onClick = {this.toeditPage}>back</div>
            </div>
        );
    }
});

var Content = React.createClass({
    render: function () {
        {
            if(jsonData.status == "editPage"){
                return (<EditPage />);
            }else {
                return (<PreviewPage />);
            }
        }
    }
});

ReactDOM.render(
    <Content />,
    document.getElementById('content')
);





