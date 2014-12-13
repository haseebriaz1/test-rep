
exports.TaskViewModel = (function(_super){

    var Notification = exports.Notification;

    function TaskViewModel(text, isMarked, model){

        _super.call(this);

        this.text = text;
        this._model = model;
        this._isMarked = isMarked || false;

        this._onMarkAll = this._onMarkAll.bind(this);
        model.addObserver("markAll", this._onMarkAll);
        model.addObserver("unMarkAll", this._onMarkAll);
    }

    extend (TaskViewModel,_super);

    TaskViewModel.prototype._isMarked = false;
    TaskViewModel.prototype.text = "";
    TaskViewModel.prototype._model = null;


    TaskViewModel.prototype.toggleMark = function() {

        this._isMarked = !this._isMarked;
        this.notify(new Notification("toggleMark"));
        return this._isMarked;
    };

    TaskViewModel.prototype.getMark = function() {

        return this._isMarked;
    };

    TaskViewModel.prototype.remove = function() {

        this.text = null;
        this._isMarked = null;
        this._model.removeObserver("markAll", this._onMarkAll);
        this._model.removeTask(this);
        this._model = null;
        this.notify(new Notification("remove"));
        this.removeAllObservers();
    };

    TaskViewModel.prototype.getStorageObject = function(){

        return {text: this.text, marked: this._isMarked};
    }

    TaskViewModel.prototype._onMarkAll = function(event){

        this._isMarked = event.type == "markAll";
        this.notify(new Notification("toggleMark"));
    }

    return TaskViewModel;
})(exports.Observable);