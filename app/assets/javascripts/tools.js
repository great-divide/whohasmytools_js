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

// Tool.new_contract FORM

// Tool.new_contract function?? 

$(function(){

	$("#show-toolbox").on("click", function() {
		
		var id = $(this).data("user-id");
		
		$.get("/users/" + id + "/tools" + ".json", function(json) {
			
			let i = 1

			json.forEach(function(tool) {
				// debugger
				let newTool = new Tool(tool)
				// add below into format function?
				
				$("#toolbox").append(
					`<div id="tool-${newTool.id}">
					<p>${i}. ` + 
					newTool.name + 
					`  (${newTool.description})  ` +
					`<button id="show-tool-${newTool.id}-contracts" data-user-id="${newTool.user_id}" data-tool-id="${newTool.id}" onclick="showToolContracts(${newTool.user_id}, ${newTool.id})">' Show Loans '</button>
					<button style="display: none" id="hide-tool-${newTool.id}-contracts" onclick="hideToolContracts(${newTool.id})"> ' Hide Loans '</button></p>
					<p id="tool-${newTool.id}-contracts-list"></p>
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





