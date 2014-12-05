/**
 * New module.
 */
$(function() {
    $("#sortable")
    .sortable({update: function( event, ui ) {renumerate();} })
    .disableSelection()

});

function renumerate () {
  $("#sortable label").each(function(label){
  })
}

