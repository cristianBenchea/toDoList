/**
 * Created by Benchea on 03.03.2018.
 */



$(document).ready(function(){
    //populating list from local storage
    const containerUL = $(".container ul");
    for(var i = 0; i < localStorage.length; i++) {
        var keys = localStorage.key(i);
        if (!isNaN(keys)) {
            containerUL.append('<li><span><i class="far fa-trash-alt"></i></span>'+localStorage.getItem(keys)+'</li>');
        }
    }
    $(".container ul li").each(function () {
        var thisLi = $(this);
        for(var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === thisLi.text()) {
                thisLi.addClass('completed');
            }

        }
    });

    //Add new task to list and local storage
    function addToList(element) {
        var text = $(element).val();
        containerUL.append('<li><span><i class="far fa-trash-alt"></i></span>'+text+'</li>');
        var currKey = 0;
        for(let i = 0; i < localStorage.length; i++) {
            var keys = localStorage.key(i);
            if (keys == currKey) {
                currKey++;
            }
        }
        localStorage.setItem(currKey, text);
        $(element).val("");
    }

    $("#newTask input").on('keypress', function (e) {
        if(e.which === 13){
            addToList($(this));
        }
    });
    $("#newTask").on('click', 'i', function () {
        addToList($(this).parent().find('input'));
    });
    $("#add").on('click', function(){
        $("#newTask").slideToggle();
        if($(this).hasClass('fa-plus')) {
            $(this).removeClass('fa-plus').addClass('fa-minus');
        } else {
            $(this).removeClass('fa-minus').addClass('fa-plus');
        }
    });

    containerUL.on('click', 'li', function () {
        $(this).toggleClass('completed');
        var text = $(this).text();

        //adding or removing the completed class to local storage
        for(let i = 0; i < localStorage.length; i++) {
            let keys = localStorage.key(i);
            if($(this).hasClass('completed')){
                if(localStorage[keys] === text){
                    localStorage.setItem(text, 'completed');
                }
            }
            else {
                if(localStorage[keys] === text){
                    localStorage.removeItem(text);
                }
            }
        }
    });

    //delete an item from the list and local Storage
    containerUL.on('click', 'span', function (e) {
        var text = $(this).parent();
        for(var i = 0; i < localStorage.length; i++) {
            var keys = localStorage.key(i);
            if(localStorage[keys] === text.text()) {
                localStorage.removeItem(keys);
            }
        }
        if(text.hasClass('completed')){
            for(var i = 0; i < localStorage.length; i++) {
                var keys = localStorage.key(i);
                if(keys === text.text()){
                    localStorage.removeItem(text.text());
                }
            }
        }
        text.fadeOut('fast', function () {
            $(this).remove();
        });

        e.stopPropagation();
    });

    var date = (new Date()).getFullYear();
    $("#footer").append(date);
});