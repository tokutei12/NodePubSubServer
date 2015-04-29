$(function() {
	$('#save').click(function(){
		$.ajax({
		  method: "POST",
		  url: "/publications/",
		  data: { message: $('#msg').val() }
		})
		  .success(function( res ) {
		  	console.log('success');
		    $('#pubs-list').html(res);
		  });
	});
    
});