
var imports = require("../src/Observable"),
    expect = require("expect.js");

var Observable = imports.Observable;
var Notification = imports.Notification;

describe("Observable Test", function(){

    var observable;
    var counter = 0;
    var before = function(){

        observable = new Observable();
        counter = 0;
    }

    var observer1 = function(){

        counter += 1;
    };

    var observer2 = function(){

        counter += 2;
    };

    var observer3 = function(){

        counter += 3;
    };



    var after = function(){

        observable = null;
        counter = 0;
    }


    it("should adds  observers correctly", function(){

        before();

        observable.addObserver("test", observer1);
        observable.addObserver("test", observer2);
        observable.addObserver("test", observer3);
        observable.notify(new Notification("test"));

        expect(counter).to.be.equal(6);
        after();
    });

    it("should removes observers correctly", function(){

        before();

        observable.addObserver("test", observer1);
        observable.addObserver("test", observer2);
        observable.addObserver("test", observer3);

        observable.removeObserver("test", observer2);
        observable.notify(new Notification("test"));

        expect(counter).to.be.equal(4);
        after();
    });

});