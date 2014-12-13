
exports.TODOModel = (function(_super){

    var TaskViewModel = exports.TaskViewModel;
    var Notification = exports.Notification;

    function TODOModel(id){

        _super.call(this);

        if(!id) {

            throw new Error("id is expected!");
        }

        this._id = id;
        this._tasks = [];
        this._onToggleMark = this._onToggleMark.bind(this);
        this.getFromLocalStorage();
        this.addObserver("update", this.saveIntoLocalStorage.bind(this));
    }

    extend (TODOModel,_super);

    TODOModel.prototype._tasks = null;
    TODOModel.prototype._id = null;

    TODOModel.prototype.addTask = function(text, isMarked){

        var taskViewModel = new TaskViewModel(text, isMarked, this);
        taskViewModel.addObserver("toggleMark", this._onToggleMark);
        this._tasks.push(taskViewModel);

        this.notify(new Notification("update"));
        this.notify(new Notification("newTask",taskViewModel));

        return taskViewModel;
    };

    TODOModel.prototype.removeTask = function(taskViewModel){

        taskViewModel.removeObserver("toggleMark", this._onToggleMark);

        var index = this._tasks.indexOf(taskViewModel);
        this._tasks.splice(index, 1);
        this.notify(new Notification("update"));
    };

    TODOModel.prototype.hasTasks = function() {

        return this._tasks.length > 0;
    };

    TODOModel.prototype.getTotalTasks = function(){

        return this._tasks.length;
    }

    TODOModel.prototype.getTotalMarkedTasks = function(){

        var total = 0;

        for(var i = this.getTotalTasks() - 1; i >= 0; i--){

            total += this._tasks[i].getMark();
        }

        return total;
    }

    TODOModel.prototype._onToggleMark = function(){

        this.notify(new Notification("update"));
    }

    TODOModel.prototype.saveIntoLocalStorage = function(){

        var tasks = [];
        var length = this.getTotalTasks();

        for(var i = 0; i < length; i++){

            tasks.push(this._tasks[i].getStorageObject());
        }

        localStorage.setItem("todoTasks" + this._id, JSON.stringify(tasks));
    }

    TODOModel.prototype.getFromLocalStorage = function(){

        var storedTasks = localStorage.getItem("todoTasks" + this._id);
        if(!storedTasks) return;
        var tasks = JSON.parse(storedTasks);
        var length = tasks.length;
        var currentTask = null;

        for(var i = 0; i < length; i++){

            currentTask = tasks[i];
            var task = this.addTask(currentTask.text, currentTask.marked);
        }
    }

    TODOModel.prototype.removeAllTasks = function(){

        for(var i = this.getTotalTasks() - 1 ; i >= 0; i--){

            this._tasks[i].remove();
        }
    }

    TODOModel.prototype.markAll = function(){

        this.notify(new Notification("markAll"));
    }

    TODOModel.prototype.unMarkAll = function(){

        this.notify(new Notification("unMarkAll"));
    }

    TODOModel.prototype.getTasks = function(){

        return this._tasks;
    }


    return TODOModel;
})( exports.Observable);
