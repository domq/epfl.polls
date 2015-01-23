/**
 * New module.
 */
$(function() {
    $("#sortable")
    .sortable({update: function( event, ui ) {renumerate();} });

    $( "#btnSubmit" ).click(function( event ) {
        //xmlhttpPost("/calc")
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/submit",
            data: {
                form: JSON.stringify({
                    order: getorder(),
                    user: $("#user").val()
                })
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