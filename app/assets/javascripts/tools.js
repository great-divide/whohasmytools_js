class Tool {
	constructor(obj) {
		this.name = obj.name;
		this.id   =  obj.id;
		this.description = obj.description;
		this.user_id = obj.user_id;
		this.contracts = obj.contracts;
		this.active = obj.active
	}
}

Tool.prototype.newContractForm = function() {
	let id = this.id
	
	$.get(`/tools/${id}/contracts/new`, function(response) {
		$(`#tool-${id}-contracts-list`).empty().prepend(response);

		$('#create_contract').submit(function(event) {
			event.preventDefault();

			let url = `${this.action}` + '.json';

			let data = {
				'authenticity_token': $("input[name='authenticity_token']").val(),
				'contract':{
					'tool': $("#tool").val(),
					'borrower': $('#borrower').val()
				}
			}
			$.post(url, $("#create_contract").serialize())
			.done(function(contract) {
				
				showToolContracts(contract.loaner.id, contract.tool.id);

				if (!!$.trim($('#active_loans_empty').html())) {
					$('#active_loans_empty').empty();
				}
				var date = new Date(contract.created_at)
				$('#active_loans').append(`<li id="contract_${contract.id}">You loaned your ${contract.tool.name} to 
					${contract.borrower.username} on ${date}.</li>`)
			})
		})
	});
}


$(function(){

	$("#show-toolbox").on("click", function() {
		
		var id = $(this).data("user-id");
		
		$.get("/users/" + id + "/tools" + ".json", function(json) {
			
			let i = 1

			json.forEach(function(tool) {
				
				let newTool = new Tool(tool)

				newTool.listTool(i)		
									
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




$(function() {
	$("#create_tool").submit(function(event) {
		
		event.preventDefault();

		let url = `${this.action}`+ '.json';

		let data = {
			'authenticity_token': $("input[name='authenticity_token']").val(),
			'tool':{
				'name': $("#tool_name").val(),
				'description': $("#tool_description").val()
			}
		}

		$.post(url, $("#create_tool").serialize() )
		.done(function(tool) {
			$("#create_tool").trigger( "reset" ).attr('selected',false);

			var i = $("#toolbox").children().length + 1
			var id = tool.user_id

			$("#toolbox").append(
				`<div id="tool-${tool.id}">
				<p>${i}. ` + 
				tool.name + 
				`  (${tool.description})  ` +
				`<button id="show-tool-${tool.id}" data-user-id="${id}" data-tool-id="${tool.id}" onclick="showTool(${id}, ${tool.id})">' Show Tool '</button>
				<button style="display: none" id="hide-tool-${tool.id}" onclick="hideTool(${tool.id})"> ' Hide Tool '</button></p>
				<p id="tool-${tool.id}-status"></p>
				</div>`);	
		})
	})
})




Tool.prototype.listTool = function (i) {
	$("#toolbox").append(
		`<div id="tool-${this.id}">
		<p>${i}. ` + 
		this.name + 
		`  (${this.description})  ` +
		`<button id="show-tool-${this.id}-contracts" data-user-id="${this.user_id}" data-tool-id="${this.id}" onclick="showToolContracts(${this.user_id}, ${this.id})">' Show Loans '</button>
		<button style="display: none" id="hide-tool-${this.id}-contracts" onclick="hideToolContracts(${this.id})"> ' Hide Loans '</button></p>
		<p id="tool-${this.id}-contracts-list"></p>
		</div>`
	)
}


