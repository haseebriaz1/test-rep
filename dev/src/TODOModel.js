
exports.TODOModel = (function(){

    function TODOModel(){

        this._tasks = [];
    }

    TODOModel.prototype._tasks = null;

    TODOModel.prototype.onUpdate = function(){};

    TODOModel.prototype.addTask = function(taskViewModel){

        taskViewModel.onUpdate = this.onUpdate;
        this._tasks.push(taskViewModel);
        this.onUpdate();
        return taskViewModel;
    };

    TODOModel.prototype.removeTask = function(task){

        var index = this._tasks.indexOf(task);
        this._tasks.splice(index, 1);
        this.onUpdate();
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


    return TODOModel;
})();
