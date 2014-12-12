
exports.TaskView = (function(_super){

    function TaskView(rowNode, viewModel){

        this._viewModel = viewModel;

        var node = this.domNode = rowNode.cloneNode(true);
        var content = this._content = node.querySelector("content");
        content.textContent = viewModel.text;

        this._setupButton(node.querySelector(".markButton"), this._onToggleMarkClicked);
        this._setupButton(node.querySelector(".deleteButton"), this._onRemoveTaskClicked);
    }

    TaskView.prototype._viewModel = null;
    TaskView.prototype.domNode = null;
    TaskView.prototype._content = null;

    TaskView.prototype._setupButton = function(node, clickHandler) {

        node.addEventListener("click", clickHandler.bind(this));
        return node;
    };

    TaskView.prototype._onToggleMarkClicked = function() {

        this._toggleMark();
    };

    TaskView.prototype._toggleMark = function() {

        this._content.className = this._viewModel.toggleMark()? "doneTaskText": "taskaskText";
    };

    TaskView.prototype._onRemoveTaskClicked = function() {

        this._viewModel.remove();
        this._viewModel = null;
        this.domNode.parentNode.removeChild(this.domNode);
    };

    return TaskView;
})();
