/**
 * @author Haseeb Riaz
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