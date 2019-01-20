$(function(){


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
					`<button id="show-tool-${tool.id}-contracts" data-user-id="${id}" data-tool-id="${tool.id}" onclick="showToolContracts(${id}, ${tool.id})">' Show Loans '</button>
					<button style="display: none" id="hide-tool-${tool.id}-contracts" onclick="hideToolContracts(${tool.id})"> ' Hide Loans '</button></p>
					<p id="tool-${tool.id}-contracts-list"></p>
					</div>`);
			
				i++;
			})

			$("#show-toolbox").toggle();
			$("#hide-toolbox").toggle();
		})		
	})

})





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

	