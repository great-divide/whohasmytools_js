function showToolContracts(userId, toolId) {
	
	$.get("/users/" + userId + "/tools/" + toolId + ".json", function(json) {	
		
		let newTool = new Tool(json)
			
		if (newTool.contracts.length > 0) {
			formatToolContracts(newTool);
		} else {			
			$(`#tool-${newTool.id}-contracts-list`).append(
			`This tool has never before been loaned! <button class="new_contract" data-tool_id="${newTool.id}">' Loan it out! '</button>`
			);
		};
	});
	$(`#show-tool-${toolId}-contracts`).toggle();
	$(`#hide-tool-${toolId}-contracts`).toggle();
};

function hideToolContracts(toolId) {
	$(`#tool-${toolId}-contracts-list`)[0].innerHTML = "";
	$(`#show-tool-${toolId}-contracts`).toggle();
	$(`#hide-tool-${toolId}-contracts`).toggle();

}

function formatToolContracts(tool) {

	var date = new Date(tool.contracts[tool.contracts.length-1].borrower.created_at)

	if (tool.active === false) {
		$(`#tool-${tool.id}-contracts-list`).prepend(
			`<li>Tool is ready to be loaned! <button class="new_contract" data-tool_id="${tool.id}" onclick="newToolContract(${tool.id}">' Loan it out! '</button></li>`
		);
	} else if (tool.active === true) {
		$(`#tool-${tool.id}-contracts-list`).prepend(
			`<li><button class="new_contract" data-tool_id="${tool.id}">Mark it as Returned!</button></li>`
		).on("click", closeContract(tool));
	}

	$(`#tool-${tool.id}-contracts-list`).append(
		`<br><li>You loaned it to <b> ${tool.contracts[tool.contracts.length-1].borrower.username} </b> on 
		${date}</li>`
	);

	if (tool.contracts.length > 1) {
		tool.contracts.pop();
		tool.contracts.forEach(function(contract) {

			var newDate = new Date(contract.borrower.created_at);

			$(`#tool-${tool.id}-contracts-list`).append(
				`<li>You loaned it to <b> ${contract.borrower.username} </b> on 
				${date}</li>`
			);
		});
	}
};

function closeContract(tool) {
	$.ajax({
		url: `${tool.user_id}/contracts/${tool.contracts.length-1}/update.json`,
		datatype: 'JSON',
		method: "PATCH",
		data: {return: "true"}
	})
}



function newToolContract(toolId) {

	$.get(`/tools/`+ toolId + `/contracts/new`, function(response) {

			$(`#tool-${toolId}-contracts-list`).prepend(response)
		});
}