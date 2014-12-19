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
    var ele = "";
    $("#sortable").children("li").map(function (index, eli) {
        ele += eli.getAttribute("id");
    });
    return ele;
}