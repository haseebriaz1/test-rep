
var imports = require("./todo"),

    expect = require("expect.js");

describe("TODOModel Tests", function(){

    var todoModel, tasks;

    var before = function(){

        todoModel = new imports.TODOModel("testTodo");
        tasks = [];
    }

    var after = function(){

        todoModel.removeAllTasks();
        todoModel = tasks = null

    }

    var addTasks = function(total){

        for(var i = 0; i < total; i++){

            tasks.push(todoModel.addTask("TestTask" + i));
        }

        return 10;
    }

    var markAsDone = function(total){

        for(var i = 0; i < total; i++){

            tasks[i].toggleMark();
        }
    }

    var removeTasks = function(total){

        for(var i = 0; i < total; i++){

            tasks[i].remove();
        }
    }

    it("TestModel should initialise correctly", function(){

        before();
        expect(todoModel.getTotalTasks()).to.be.equal(0);
        after();
    });

    it("TestModel should addd tasks correctly", function(){

        before();
        addTasks(10);
        expect(todoModel.getTotalTasks()).to.be.equal(10);
        after();

    });

    it("TestModel.getTotalMarkedTasks() works correctly", function(){

        before();
        addTasks(10);
        markAsDone(5);
        expect(todoModel.getTotalMarkedTasks()).to.be.equal(5);
        after();
    });

    it("Tasks should get removed correctly", function(){

        before();
        addTasks(10);
        markAsDone(5);
        removeTasks(3);

        expect(todoModel.getTotalTasks()).to.be.equal(7);
        expect(todoModel.getTotalMarkedTasks()).to.be.equal(2);
        expect(todoModel._tasks[0].text).to.be.equal("TestTask3");
        expect(todoModel._tasks[todoModel.getTotalTasks() - 1].text).to.be.equal("TestTask9");
        expect(tasks[0].text).to.be.equal(null);
        expect(tasks[0].getMark()).to.be.equal(null);
        expect(tasks[0]._model).to.be.equal(null);

        after();
    });

    it("Tasks should save and retrieve from localStorate correctly", function(){

        before();
        addTasks(10);
        markAsDone(5);

        before();
        expect(todoModel.getTotalMarkedTasks()).to.be.equal(5);
        expect(todoModel.getTotalTasks()).to.be.equal(10);
        after();

    });

    it("markAll and unMarkAll works properly", function(){

        before();
        addTasks(10);
        markAsDone(5);

        todoModel.markAll();

        before();
        expect(todoModel.getTotalMarkedTasks()).to.be.equal(10);
        expect(todoModel.getTotalTasks()).to.be.equal(10);

        todoModel.unMarkAll();
        expect(todoModel.getTotalMarkedTasks()).to.be.equal(0);
        expect(todoModel.getTotalTasks()).to.be.equal(10);
        after();

    });


});
