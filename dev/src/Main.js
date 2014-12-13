/**
 * @author haseeb.riaz
 */


document.addEventListener("DOMContentLoaded", function(){


    var todoElements = document.getElementsByTagName('TODO');
    for(var i = 0; i < todoElements.length; i++){

        new exports.TODOView(todoElements[i], new exports.TODOModel(todoElements[i].id));
    }
});

