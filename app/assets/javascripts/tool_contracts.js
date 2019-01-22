class ToolContract {
	constructor(obj) {
		this.id = obj.id;
		this.tool = obj.tool;
		this.loaner = obj.loaner;
		this.borrower = obj.borrower;
		this.active = obj.active;
		this.created_at = obj.created_at;
		this.updated_at = obj.updated_at;
	}
}

function showToolContracts(userId, toolId) {
	
	$.get("/users/" + userId + "/tools/" + toolId + ".json", function(json) {	

		let newTool = new Tool(json)
			
		if (newTool.contracts.length > 0) {
			$(`#tool-${newTool.id}-contracts-list`).prepend(
				`<button id="new_contract" data-tool_id="${newTool.id}" style="display: none">' Loan it out! '</button>
				<button id="close_contract" data-tool-id="${newTool.id}" style="display: none">Mark it as Returned!</button>`
			);

		$(`#new_contract`).click(function() {
				[newTool], newToolContract(newTool)
			});

			formatToolContracts(newTool);

		} else {			
			$(`#tool-${newTool.id}-contracts-list`).append(
				`This tool has never before been loaned!`
			);
			$(`#new_contract`).toggle();
		}
	})
	$(`#show-tool-${toolId}-contracts`).toggle();
	$(`#hide-tool-${toolId}-contracts`).toggle();
}

function hideToolContracts(toolId) {
	$(`#tool-${toolId}-contracts-list`)[0].innerHTML = "";
	$(`#show-tool-${toolId}-contracts`).toggle();
	$(`#hide-tool-${toolId}-contracts`).toggle();
}

function formatToolContracts(tool) {
	
	tool.contracts.forEach(function(contract) {
		let newContract = new ToolContract(contract)
 	
		let loanDate = new Date(newContract.created_at);

		if (newContract.active === true) {
			$(`#tool-${tool.id}-contracts-list`).prepend(
				`<li>You loaned it to <b> ${newContract.borrower.username} </b> on 
				${loanDate}</li><br>`
			);
		} else if (newContract.active === false) {
			let returnDate = new Date(newContract.updated_at)
			$(`#tool-${tool.id}-contracts-list`).prepend(
				`<li>You loaned it to <b> ${newContract.borrower.username} </b> on 
				${loanDate}</li>
				<li> <b>${newContract.borrower.username} returned it </b>on ${returnDate}.
				</li><br>`
			)
		}	
	})


	$(`#tool-${tool.id}-contracts-list`).prepend(
		`<button id="new_contract" data-tool_id="${tool.id}" style="display: none">' Loan it out! '</button>
		<button id="close_contract" data-tool-id="${tool.id}" style="display: none">Mark it as Returned!</button>`
	);

	$(`#new_contract`).click(function() {
				[tool], newToolContract(tool)
			})
	

	if (tool.active === false) {
		$(`#new_contract`).toggle();
	} else if (tool.active === true) {
		let activeContract = tool.contracts[tool.contracts.length-1]

		$(`#close_contract`).toggle().click(function() {	
			[activeContract], closeContract(activeContract);
		});
	}
};

function closeContract(contract) {
	
	$.ajax({
		url: `${contract.loaner.id}/contracts/${contract.id}/update.json`,
		method: "PATCH",
		data: {return: "true", id: "${contract.id}"},
	}).done(function() {
		$(`#new_contract`).toggle();
		$(`#close_contract`).toggle();

		let returnDate = new Date(contract.updated_at);

		$(`#tool-${contract.tool.id}-contracts-list li:first`).append(`
			<li> <b>${contract.borrower.username} returned it </b>on ${returnDate}.
			</li>`
		)
		$(`#contract_${contract.id}`).remove();
		
		if (!$.trim($('#active_loans').html())) {
			$('#active_loans').append("<li>You are not loaning any tools right now.</li>")
		}
	})	
}

// Tool.prototype.listTool = function () {
// 	return `
// 		<div id="tool-${this.id}">
// 		<p>${i}. ` + 
// 		this.name + 
// 		`  (${this.description})  ` +
// 		`<button id="show-tool-${this.id}" data-user-id="${this.user_id}" data-tool-id="${this.id}" onclick="showTool(${this.user_id}, ${this.id})">' Show Tool '</button>
// 		<button style="display: none" id="hide-tool-${this.id}" onclick="hideTool(${this.id})"> ' Hide Tool '</button></p>
// 		<p id="tool-${this.id}-status"></p>
// 		</div>`
// }

// Tool

function newToolContract(tool) {
	$.get(`/tools/${tool.id}/contracts/new`, function(response) {
			$(`#tool-${tool.id}-contracts-list`).empty().prepend(response)
	});
}