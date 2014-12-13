/**
 * Created by JetBrains PhpStorm.
 * User: haseebriaz
 * Date: 13/12/2014
 * Time: 10:40
 * To change this template use File | Settings | File Templates.
 */
exports.Observable = (function(){

    function Observable(){

        this._observers = {};
    }

    Observable.prototype._observers = null;

    Observable.prototype.addObserver = function(type, observer) {

        var observers = this._getObservers(type);
        if(observers.indexOf(observer) < 0) observers.push(observer);
    };

    Observable.prototype.removeObserver = function(type, observer) {

        var observers = this._getObservers(type);
        var index = observers.indexOf(observer);
        observers.splice(index, 1);
    };

    Observable.prototype._getObservers = function(type){

        return this._observers[type]? this._observers[type]: this._observers[type] = [];
    };

    Observable.prototype.notify = function(type) {

        var observers = this._getObservers(type);
        var length = observers.length;

        for(var i = 0; i < length; i++){

            observers[i]();
        }
    };

    return Observable;

})();


exports.TaskViewModel = (function(){

    function TaskViewModel(text, model){

        this.text = text;
        this._model = model;
        model.addTask(this);
    }

    TaskViewModel.__proto__ = exports.Observable;

    TaskViewModel.prototype._isMarked = false;
    TaskViewModel.prototype.text = "";
    TaskViewModel.prototype._model = null;

    TaskViewModel.prototype.onUpdate = function(){};

    TaskViewModel.prototype.toggleMark = function() {


        this._isMarked = !this._isMarked;
        this.onUpdate();
        return this._isMarked;
    };

    TaskViewModel.prototype.getMark = function() {

        return this._isMarked;
    };

    TaskViewModel.prototype.remove = function() {

        this._isMarked = null;
        this.text = null;
        this._model.removeTask(this);
        this._model = null;
    };

    TaskViewModel.prototype.getStorageObject = function(){

        return {text: this.text, marked: this._isMarked};
    }

    return TaskViewModel;
})();

exports.TODOModel = (function(){

    var TaskViewModel = exports.TaskViewModel;

    function TODOModel(){

        this._tasks = [];
    }

    TODOModel.__proto__ = exports.Observable;

    TODOModel.prototype._tasks = null;

    TODOModel.prototype.onUpdate = function(){};

    TODOModel.prototype.addTask = function(text){

        var taskViewModel = new TaskViewModel(text);
        taskViewModel.onUpdate = this.onUpdate;
        this._tasks.push(taskViewModel);
        this.notify("added");
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

    TODOModel.prototype.saveIntoLocalStorage = function(){

        var tasks = [];
        var length = this.getTotalTasks();

        for(var i = 0; i < length; i++){

            tasks.push(this._tasks[i].getStorageObject());
        }

        localStorage.setItem("todoTasks", JSON.stringify(tasks));
    }

    return TODOModel;
})();
