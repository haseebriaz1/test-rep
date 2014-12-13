
exports.TODOView = (function(){

    //imports
    //---
    var TaskView = exports.TaskView;

    function TODOView(node, model){

        this._model = model;

        model.addObserver("update", this._onModelUpdate.bind(this));
        model.addObserver("newTask", this._onNewTask.bind(this));

        var shadow = node.createShadowRoot();
        var template = document.querySelector('#todoTemplate');
        var clone = document.importNode(template.content, true);
        shadow.appendChild(clone);

        this._input = shadow.querySelector("#inputBox");
        this._setupButton(shadow.querySelector("#addTask"), this._onAddTaskClicked);
        this._markAllButton = this._setupButton(shadow.querySelector("#markAll"), this._onMarkAllClickHandler);
        this._setupButton(shadow.querySelector("#removeAll"), this._onRemoveAllClicked);


        var tasks = this._tasks = shadow.querySelector(".todoTasks");
        var task = this._task = shadow.querySelector(".taskRow");
        tasks.removeChild(task);

        this._totalTasks = shadow.querySelector(".totalTasks");
        this._doneTasks = shadow.querySelector(".doneTasks");

        this._onRemove = this._onRemove.bind(this);

        this._populateFromModel();

    }

    TODOView.prototype._model = null;
    TODOView.prototype._task = null;
    TODOView.prototype._tasks = null;
    TODOView.prototype._input = null;
    TODOView.prototype._totalTasks = null;
    TODOView.prototype._doneTasks= null;
    TODOView.prototype._markAllButton= null;
    TODOView.prototype._markAllCommand = function(){};

    TODOView.prototype._setupButton = function(button, handler){

        button.addEventListener("click", handler.bind(this));
        return button;
    }

    TODOView.prototype._onAddTaskClicked = function() {

        var text = this._input.value;
        if(text){

            this._model.addTask(text);
        }

        this._input.value = "";
        this._input.focus();
    };

    TODOView.prototype._onMarkAllClickHandler = function(){

        this._markAllCommand();
    }

    TODOView.prototype._markAll = function(){

        this._model.markAll();
        this._updateMarkButton();
    }

    TODOView.prototype._unMarkAll = function(){

        this._model.unMarkAll();
        this._updateMarkButton();
    }

    TODOView.prototype._updateMarkButton = function(){

        if(this._model.getTotalTasks() && this._model.getTotalMarkedTasks() == this._model.getTotalTasks()){

            this._markAllCommand = this._unMarkAll;
            this._markAllButton.innerText = "Unmark All";
        } else {

            this._markAllCommand = this._markAll;
            this._markAllButton.innerText = "Mark All";
        }

    }

    TODOView.prototype._onRemoveAllClicked = function(){

        this._model.removeAllTasks();
    };

    TODOView.prototype._onNewTask = function(notification){

        this._createNewRow(notification.data);
    }

    TODOView.prototype._createNewRow = function(taskModel) {

        var taskView = new TaskView(this._task, taskModel);
        taskView.addObserver("remove", this._onRemove);
        this._tasks.appendChild(taskView.domNode);
    };

    TODOView.prototype._onModelUpdate = function(){

        this._updateTotals();
    };

    TODOView.prototype._onRemove = function(event){

        var taskView = event.target;
        taskView.removeObserver("remove", this._onRemove);

        this._tasks.removeChild(taskView.domNode);
    }

    TODOView.prototype._populateFromModel = function(){

        var tasks = this._model.getTasks();
        var length = tasks.length;

        for(var i = 0; i < length; i++){

            this._createNewRow(tasks[i]);
        }

        this._updateTotals();

    }

    TODOView.prototype._updateTotals = function(){

        this._totalTasks.innerText =  this._model.getTotalTasks();
        this._doneTasks.innerText = this._model.getTotalMarkedTasks();

        this._updateMarkButton();
    }

    return TODOView;

})();