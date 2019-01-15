class ToolsController < ApplicationController
		# add before: helper method to redirect if !logged_in?

	def index
		# if logged_in?
		# 	@user = User.find_by(id: params[:user_id])
		# else
		# 	redirect_to '/'
		# end

		if params[:user_id]
			@user = User.find_by(id: params[:user_id])
		else
			@user = current_user
		end
	end

	def new
		@tool = Tool.new
	end

	def create
		if logged_in?
			@tool = Tool.new(tool_params)
			@tool.user_id = current_user.id

			if @tool.valid?
				@tool.save
				redirect_to user_path(current_user.id)
			end
		else
			# add error message
			redirect_to user_path(current_user.id)
		end
	end

	def show
		if logged_in?
			@tool = Tool.find_by(id: params[:id])
		else
			redirect_to '/'
		end
	end

	def edit
		if logged_in?
			@tool = Tool.find_by(id: params[:id])
		else
			redirect_to '/'
		end
	end

	def update
    @tool = Tool.find_by_id(params[:id])
    @tool.update(tool_params)
    if @tool.save
      redirect_to tool_path(@tool)
    else
      render :edit
    end
  end

  def destroy

  	if logged_in?
  		@tool = Tool.find_by(id: params[:id])
  		if !@tool.active

		  	@tool = Tool.find_by(id: params[:id])
		  	@tool.destroy
		  	redirect_to user_tools_path(current_user)
		  elsif @tool.active
		  	# error message:  "So and so  is borrowing that tool right now!"
		  	redirect_to user_tools(current_user)
		  end
	  else
	  	redirect_to '/'
	  end
  end


private
	def tool_params
		params.require(:tool).permit(:name, :description, :user_id)
	end
end
