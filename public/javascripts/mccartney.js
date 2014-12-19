/**
 * New module.
 */
$(function() {
    $("#sortable")
    .sortable({update: function( event, ui ) {renumerate();} });

    $( "#btnSubmit" ).click(function( event ) {
        //xmlhttpPost("/calc");
        alert(getorder());
        event.preventDefault();
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
    })).join(",");
}