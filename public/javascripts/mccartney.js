/**
 * New module.
 */
function jsonpost(params) {
    var ajaxParams = {};
    $.extend(ajaxParams, params);
    $.extend(ajaxParams, {
        type: "POST",
        contentType: "application/json;charset=UTF-8"
    });
    if (! (ajaxParams.data instanceof String)) {
        ajaxParams.data = JSON.stringify(ajaxParams.data);
    }
    return $.ajax(ajaxParams);
};

$(function() {
    $("#sortable")
    .sortable({update: function( event, ui ) {renumerate();} });

    $( "#btnSubmit" ).click(function( event ) {
        //xmlhttpPost("/calc")
        event.preventDefault();
        jsonpost({
            url: "/submit",
            data: {
                order: getorder(),
                user: $("#user").val()
            }
        }).done(function () {
            alert("Thanks, bye");
        }).fail(function () {
            alert("Whoops");
        });
    });
});

function renumerate () {
  $("#sortable label").each(function(label){
  })
}

function getorder() {
    //$(".active").children("a").attr("id");

    return $.makeArray($("#sortable").children("li").map(function (index, eli) {
        return eli.getAttribute("id");
    }));
}