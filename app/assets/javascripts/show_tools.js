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
					`<button id="show-tool-${tool.id}-contracts" data-user-id="${id}" data-tool-id="${tool.id}" onclick="showToolContracts(${id}, ${tool.id})">' Show Tool '</button>
					<button style="display: none" id="hide-tool-${tool.id}" onclick="hideTool(${tool.id})"> ' Hide Tool '</button></p>
					<p id="tool-${tool.id}-contracts-list"></p>
					</div>`);
			
				i++;
			})

			$("#show-toolbox").toggle();
			$("#hide-toolbox").toggle();
		})		
	})

})



function showToolContracts(userId, toolId) {
	
	$.get("/users/" + userId + "/tools/" + toolId + ".json", function(json) {	
		// make new instance of Tool, use custom function for all this HTML
		
		if (json.contracts.length > 0) {

			formatToolContracts(json, toolId);

		} else {
			$(`#tool-${toolId}-status`).append(
			`This tool has not been loaned.`
			);
		};
	});
	
	$(`#show-tool-${toolId}`).toggle();
	$(`#hide-tool-${toolId}`).toggle();
};

function formatToolContracts(tool) {
	

	var date = new Date(tool.contracts[tool.contracts.length-1].borrower.created_at)

	if (tool.active === false) {
		$(`#tool-${tool.id}-contracts-list`).prepend(
			`<li>Tool is ready to be loaned! <button class="new_contract" data-tool_id="${tool.id}">' Loan it out! '</button></li>`
		);
	} else if (tool.active === true) {
		$(`#tool-${tool.id}-contracts-list`).prepend(
			`<li><button class="new_contract" data-tool_id="${tool.id}">Mark it as Returned!</button></li><br>`
		);
	}

			$(`#tool-${tool.id}-contracts-list`).append(
				`<br><li>You loaned it to <b> ${tool.contracts[tool.contracts.length-1].borrower.username} </b> on 
				${date}</li>`
			);

			tool.contracts.pop();

			tool.contracts.forEach(function(contract) {
				

				var newDate = new Date(contract.borrower.created_at);

				$(`#tool-${tool.id}-contracts-list`).append(
					`<li>You loaned it to <b> ${contract.borrower.username} </b> on 
					${date}</li>`
				);
			});

			$(".new_contract").on("click", function() {
				$.get(`/tools/`+ tool.id + `/contracts/new`, function(response) {
				});
				// 	debugger
			})

			
}

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

	