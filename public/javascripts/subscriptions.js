$(function() {
	$('#save').click(function(){
		$.ajax({
		  method: "POST",
		  url: "/subscriptions/",
		  data: { username: $('#user').val() }
		})
		  .success(function( res ) {
		    $('#subs-list').html(res);
		  });
	});
    
});