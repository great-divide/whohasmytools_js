$(function(){
	console.log("show_tools loaded")

	$("#show-toolbox").on("click", function() {
		
		var id = $(this).data("user-id");
		
		$.get("/users/" + id + "/tools" + ".json", function(json) {
			
			let i = 1

			json.forEach(function(tool) {
				// debugger
				// let newTool = new Tool(tool)
				// add below into format function
				
				$("#toolbox").append(
					`<div id="tool-${tool.id}">
					<p>${i}. ` + 
					tool.name + 
					`  (${tool.description})  ` +
					`<button id="show-tool-${tool.id}" data-user-id="${id}" data-tool-id="${tool.id}" onclick="showTool(${id}, ${tool.id})">' Show Tool '</button>
					<button style="display: none" id="hide-tool-${tool.id}" onclick="hideTool(${tool.id})"> ' Hide Tool '</button></p>
					<p id="tool-${tool.id}-status"></p>
					</div>`);
			
				i++;
			})

			$("#show-toolbox").toggle();
			$("#hide-toolbox").toggle();
		})		
	})

})



function showTool(userId, toolId) {
	
	$.get("/users/" + userId + "/tools/" + toolId + ".json", function(json) {	
		// make new instance of Tool, use custom function for all this HTML
		
		if (json.contracts.length > 0) {

			var date = new Date(json.contracts[json.contracts.length-1].borrower.created_at)

			$(`#tool-${toolId}-status`).append(
				`You loaned it to <b> ${json.contracts[json.contracts.length-1].borrower.username} </b> on 
				${date}
				<button class="new_contract" data-tool_id="${toolId}">Loan it out!</button>`
			);

			// $(".new_contract").addEventListener()

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

	