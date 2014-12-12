/**
 * @author haseeb.riaz
 */


var TaskViewModel = (function(_super){
	
	function constructor(text, model){
		
		this.text = text;
		this._model = model;
		model.addTask(this);
	}
	
	var TaskViewModel = extend(constructor, _super);

	TaskViewModel.prototype._isMarked = false;
	TaskViewModel.prototype.text = "";
	TaskViewModel.prototype._model = null;
	
	TaskViewModel.prototype.toggleMark = function() {
		
		return this._isMarked = !this._isMarked;
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


var TODOModel = (function(_super){
	
	function constructor(){
		
		this._tasks = [];
	}
	
	var TODOModel = extend(constructor, _super);
	
	TODOModel.prototype._tasks = null;
	
	TODOModel.prototype.addTask = function(taskViewModel){
		
		this._tasks.push(taskViewModel);
		return taskViewModel;
	};
	
	TODOModel.prototype.removeTask = function(task){
		
		var index = this._tasks.indexOf(task);
		this._tasks.splice(index, 1);
	};
	
	TODOModel.prototype.hasTasks = function() {
		
		return this._tasks.length > 0;
	};
	
	return TODOModel;
})();

var TaskView = (function(_super){
	
	function constructor(rowNode, viewModel){
		
		this._viewModel = viewModel;
		
		var node = this.domNode = rowNode.cloneNode(true);
		var content = this._content = node.querySelector("content");
		content.textContent = viewModel.text;
		
		this._setupButton(node.querySelector(".markButton"), this._onToggleMarkClicked);
		this._setupButton(node.querySelector(".deleteButton"), this._onRemoveTaskClicked);
	}
	
	var TaskView = extend(constructor, _super);
	
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

var TODOView = (function(_super){
	
	function constructor(model){
		
		this._model = model;
		var shadow = document.querySelector('#todoComponent').createShadowRoot();
		var template = document.querySelector('#todoTemplate');
		var clone = document.importNode(template.content, true);
		shadow.appendChild(clone);
		
		this._input = shadow.querySelector("#inputBox"); 
		var addTaskButton = this._addTaskButton = shadow.querySelector("#addTask");
		addTaskButton.addEventListener("click", this._onAddTaskClicked.bind(this));
		
		var tasks = this._tasks = shadow.querySelector("todo-tasks");
		var task = this._task = shadow.querySelector("todo-task");
		tasks.removeChild(task);
		
		var TaskRow = document.registerElement("task-row");
	}
	
	var TODOView = extend(constructor, _super);
	
	TODOView.prototype._model = null;
	TODOView.prototype._task = null;
	TODOView.prototype._tasks = null;
	TODOView.prototype._input = null;
	TODOView.prototype._addTaskButton = null;
	
	TODOView.prototype._onAddTaskClicked = function() {
		
		this._createNewRow(this._input.value);
	};
	
	TODOView.prototype._createNewRow = function(taskText) {
		
		var taskView = new TaskView(this._task, new TaskViewModel(taskText, this._model));
		this._tasks.appendChild(taskView.domNode);
	};
	
	return TODOView;
	
})();

document.addEventListener("DOMContentLoaded", function(){
	
	new TODOView(new TODOModel());
});

