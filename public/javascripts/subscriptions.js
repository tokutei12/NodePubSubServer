$(function() {
	$('#save').click(function(){
		var channels = $("#channels").val().split(/[ ,]+/);

		$.ajax({
		  method: "POST",
		  url: "/subscriptions/",
		  traditional: true,
		  data: { username: $('#user').val(),
		  		  channels: channels }
		})
		  .success(function( res ) {
		    $('#subs-list').html(res);
		  });
	});
    
});