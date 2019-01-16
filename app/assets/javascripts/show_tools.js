// $(function () {

// 	$(".show-tool").on("click", function() {
// 		debugger
// 		var toolId = $(this).data("tool-id")

// 		$.get("/users/" + id + "/tools/" + toolId + ".json", function(json) {	
// 			console.log(json)
// 		});

// 	});

// });



function showTool(userId, toolId) {
	
	$.get("/users/" + userId + "/tools/" + toolId + ".json", function(json) {	
		debugger
	})
}