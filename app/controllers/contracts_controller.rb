class ContractsController < ApplicationController
	

	def index
		if logged_in?
			@user = current_user
	
		else
			redirect_to '/'
		end
	end

	def new
		@user = current_user
		@tool = Tool.find(params[:tool_id])
		if @tool.active == false
			@contract = Contract.new
			
			respond_to do |format|
				format.html
				format.js { render partial: 'new_contract_form'}
			end
		else
			@contract = @tool.contracts.active.first
		end
		
	end



	def create
		if logged_in? && User.find_by(username: params["contract"]["borrower"])
			# binding.pry
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
			# binding.pry
			@contract = Contract.find_by(id: params[:id])
			# binding.pry
			if params[:return]
				@contract.terminate
				@contract.save
				# add message "@tool.name returned"
			elsif params[:extend]
				# change due date, which doesn't exist yet
			end
			respond_to do |format|
			format.html {redirect_to user_contracts_path(current_user)}
			format.json { render json: @contract }
		end
		end
	end

private
	def contract_params
		params.require(:contract).permit(:tool_id)
	end

end
