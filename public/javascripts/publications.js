$(function() {
	$('#save').click(function(){
		var channels = $("#channels").val().split(/[ ,]+/);
		var reqObj = { message: $('#msg').val(), channels: channels};

		$.ajax({
		  method: "POST",
		  url: "/publications/",
		  traditional: true,
		  contentType: "application/json",
		  data: JSON.stringify(reqObj),
		  success: function(res){
		  	console.log('success');
		    $('#pubs-list').html(res);
		  }
		})
	});
    
});