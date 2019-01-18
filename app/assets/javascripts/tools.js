$(function() {
	console.log("tools.js loaded")
})


class Tool {
	constructor(obj) {
		this.name = obj.name;
		this.description = obj.description;
		this.user_id = obj.user_id;
	}
}



Tool.prototype.listTool = function () {
	return `
		<div id="tool-${this.id}">
		<p>${i}. ` + 
		this.name + 
		`  (${this.description})  ` +
		`<button id="show-tool-${this.id}" data-user-id="${this.user_id}" data-tool-id="${this.id}" onclick="showTool(${this.user_id}, ${this.id})">' Show Tool '</button>
		<button style="display: none" id="hide-tool-${this.id}" onclick="hideTool(${this.id})"> ' Hide Tool '</button></p>
		<p id="tool-${this.id}-status"></p>
		</div>`
}

// Tool.new_contract FORM

// Tool.new_contract function?? 