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
};

function hideToolContracts(toolId) {
	$(`#tool-${toolId}-contracts-list`)[0].innerHTML = "";
	$(`#show-tool-${toolId}-contracts`).toggle();
	$(`#hide-tool-${toolId}-contracts`).toggle();
};

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
	)

	$(`#new_contract`).click(function() {
				tool.newContractForm();
	})
	

	if (tool.active === false) {
		$(`#new_contract`).toggle();
	} else if (tool.active === true) {
		let activeContract = tool.contracts[tool.contracts.length-1]

		$(`#close_contract`).toggle().click(function() {	
			[activeContract], closeContract(activeContract);
		})
	}

	$(`#tool-${tool.id}-contracts-list`).prepend(`You have loaned this tool ${tool.contracts.length} times!<br><br>`)
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
			$('#active_loans').append(`<li id="active_loans_empty">You are not loaning any tools right now.</li>`)
		}
	})	
};


