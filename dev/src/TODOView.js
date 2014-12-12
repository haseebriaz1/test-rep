
exports.TODOView = (function(){

    var TaskView = exports.TaskView;
    var TaskViewModel = exports.TaskViewModel;

    function TODOView(node, model){

        this._model = model;

        model.onUpdate = this._onModelUpdate.bind(this);
        var shadow = node.createShadowRoot();
        var template = document.querySelector('#todoTemplate');
        var clone = document.importNode(template.content, true);
        shadow.appendChild(clone);

        this._input = shadow.querySelector("#inputBox");
        var addTaskButton =  shadow.querySelector("#addTask");
        addTaskButton.addEventListener("click", this._onAddTaskClicked.bind(this));

        var tasks = this._tasks = shadow.querySelector("todo-tasks");
        var task = this._task = shadow.querySelector("todo-task");
        tasks.removeChild(task);

        this._totalTasks = shadow.querySelector("total-tasks");
        this._doneTasks = shadow.querySelector("done-tasks");

        this._updateTotals();
    }

    TODOView.prototype._model = null;
    TODOView.prototype._task = null;
    TODOView.prototype._tasks = null;
    TODOView.prototype._input = null;
    TODOView.prototype._totalTasks = null;
    TODOView.prototype._doneTasks= null;

    TODOView.prototype._onAddTaskClicked = function() {

        if(this._input.value){

            this._createNewRow(this._input.value);
        }

        this._input.value = "";
    };

    TODOView.prototype._createNewRow = function(taskText) {

        var taskView = new TaskView(this._task, new TaskViewModel(taskText, this._model));
        this._tasks.appendChild(taskView.domNode);
    };

    TODOView.prototype._onModelUpdate = function(){

        this._updateTotals();
    };

    TODOView.prototype._updateTotals = function(){

        this._totalTasks.innerText =  this._model.getTotalTasks();
        this._doneTasks.innerText = this._model.getTotalMarkedTasks();

    }

    return TODOView;

})();