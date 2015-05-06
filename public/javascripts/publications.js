$(function() {
	$('#save').click(function(){
		var channels = $("#channels").val().split(/[ ,]+/);
		console.log(channels);

		$.ajax({
		  method: "POST",
		  url: "/publications/",
		  traditional: true,
		  data: { message: $('#msg').val(),
				  channels: channels}
		})
		  .success(function( res ) {
		  	console.log('success');
		    $('#pubs-list').html(res);
		  });
	});
    
});