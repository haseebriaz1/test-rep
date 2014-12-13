
exports.TaskView = (function(_super){

    var Notification = exports.Notification;

    function TaskView(rowNode, viewModel){

        _super.call(this);
        this._viewModel = viewModel;

        viewModel.addObserver("toggleMark", this._updateMarkView.bind(this));
        viewModel.addObserver("remove", this._onRemoved.bind(this));

        var node = this.domNode = rowNode.cloneNode(true);
        var content = this._content = node.querySelector(".taskText");
        content.textContent = viewModel.text;

        this._markButton = this._setupButton(node.querySelector(".markButton"), this._onToggleMarkClicked);
        this._setupButton(node.querySelector(".deleteButton"), this._onRemoveTaskClicked);

        this._updateMarkView();
    }

    extend(TaskView, _super);

    TaskView.prototype._viewModel = null;
    TaskView.prototype.domNode = null;
    TaskView.prototype._content = null;
    TaskView.prototype._markButton = null;

    TaskView.prototype._setupButton = function(node, clickHandler) {

        node.addEventListener("click", clickHandler.bind(this));
        return node;
    };

    TaskView.prototype._onToggleMarkClicked = function() {

        this._viewModel.toggleMark();
    };

    TaskView.prototype._updateMarkView = function(){

        if(this._viewModel.getMark()){

            this._content.className =  "doneTaskText";
            this._markButton.innerText =  "Un Mark";

        } else {

            this._content.className =  "taskText";
            this._markButton.innerText =  "Mark";

        }
    }

    TaskView.prototype._onRemoveTaskClicked = function() {

        this._viewModel.remove();
        this._viewModel = null;

        this._onRemoved();
     };

    TaskView.prototype._onRemoved = function(){

        this.notify(new Notification("remove"));
    }

    return TaskView;
})(exports.Observable);
