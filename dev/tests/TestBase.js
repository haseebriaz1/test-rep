/**
 * Created by JetBrains PhpStorm.
 * User: haseebriaz
 * Date: 13/12/2014
 * Time: 14:01
 * To change this template use File | Settings | File Templates.
 */

var Storage = new (function(){

    function storage(){


    }

    storage.prototype.setItem = function(key, value){

        this[key] = value;
    }

    storage.prototype.getItem = function(key){

        return this[key];
    }
    return storage;
})();


var localStorage = new Storage();