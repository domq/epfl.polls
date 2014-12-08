/**
 * New module.
 */
$(function() {
    $("#sortable")
    .sortable({update: function( event, ui ) {renumerate();} })
});

function renumerate () {
  $("#sortable label").each(function(label){
  })
}

