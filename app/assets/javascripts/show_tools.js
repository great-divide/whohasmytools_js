function showTool(userId, toolId) {
	
	$.get("/users/" + userId + "/tools/" + toolId + ".json", function(json) {	
		
		if (json.contracts.length > 0) {

			var date = new Date(json.contracts[json.contracts.length-1].borrower.created_at)

			$(`#tool-${toolId}-status`).append(
				`You loaned it to <b> ${json.contracts[json.contracts.length-1].borrower.username} </b> on 
				${date}`
			);
		} else {
			$(`#tool-${toolId}-status`).append(
			`This tool has not been loaned.`
			);
		};
	});
	
	$(`#show-tool-${toolId}`).toggle();
	$(`#hide-tool-${toolId}`).toggle();
};

$(function(){
	$("#hide-toolbox").on("click", function() {
		$("#toolbox").text("")
		$("#show-toolbox").toggle();
		$("#hide-toolbox").toggle();
	});
});	

function hideTool(toolId) {
	
	$(`#tool-${toolId}-status`).text("");
	$(`#show-tool-${toolId}`).toggle();
	$(`#hide-tool-${toolId}`).toggle();
}

	