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




