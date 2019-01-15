class ContractsController < ApplicationController
	

	def index
		if logged_in?
			@user = current_user
	
		else
			redirect_to '/'
		end
	end

	def new
		@tool = Tool.find(params[:tool_id])
		if @tool.active == false
			@contract = Contract.new
		else
			@contract = @tool.contracts.active.first
		end
		@user = current_user
	end


	def create
		if logged_in? && User.find_by(username: params["contract"]["borrower"])

			# add error message if and logic if tool not selected (first add blank option to tool select)
	
			@contract = Contract.create
			@contract.loaner = current_user
			@contract.borrower = User.find_by(username: params["contract"]["borrower"])
				if params["contract"]["tool_id"]
					@contract.tool =Tool.find_by(id: params["contract"]["tool_id"])
				elsif params["tool_id"]
					@contract.tool = Tool.find_by(id: params[:tool_id])
				end
			@contract.save

			redirect_to user_contracts_path(current_user)
		end
	end

	def show
		if logged_in?
			@user = current_user
		else
			redirect_to '/'
		end
	end

	def update
		if logged_in?
			@contract = Contract.find_by(id: params[:id])
			if params[:return]
				@contract.terminate
				# add message "@tool.name returned"
			elsif params[:extend]
				# change due date, which doesn't exist yet
			end
			redirect_to user_contracts_path(current_user)
		end
	end

private
	def contract_params
		params.require(:contract).permit(:tool_id)
	end

end
