/**
 * @author Haseeb Riaz
 */

function extend(constructor, superClass){
	
	if(superClass){
		
		constructor.__proto__ = superClass.prototype;
	}
	
	return constructor;
}

var Observable = (function(_super){
	
	function constructor(){
		
		this._observers = [];
	}
	
	var Observable = extend(constructor, _super);
	Observable.prototype._observers = null;
	
	Observable.prototype.add = function(observer) {
		
		this._observers.push(observer);
	};
	
	Observable.prototype.remove = function(observer) {
		
		if(!this.hasObserver()) return;
		
		var index = this._observers.indexOf(observer);
		this._observers.splice(index, 1);
	};
	
	Observable.prototype.hasObserver = function() {
		
		return this._observers.length > 0;
	};
	
	Observable.prototype.notify = function() {
		
		var length = this._observers.length;
		
		for(var i = 0; i < length; i++){
			
			this._observers[i]();
		}
	};
	
	return Observable;
	
})(Observable);