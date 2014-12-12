
exports.TaskViewModel = (function(){

    function TaskViewModel(text, model){

        this.text = text;
        this._model = model;
        model.addTask(this);
    }

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

    return TaskViewModel;
})();