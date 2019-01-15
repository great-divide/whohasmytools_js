require 'pry'
class UsersController < ApplicationController

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
	
		if @user.valid?
			@user.save
			session[:user_id] = @user.id

			redirect_to user_path(@user)
		else
			render :'sessions/new'
		end
	end

	def show
		if logged_in?
			@user = User.find_by(id: params[:id])
			@tool = Tool.new
			@contract = Contract.new
	  else
      redirect_to '/'
    end
	end


private
	def user_params

		params.require(:user).permit(:username, :email, :password, :password_confirmation)
	end

end
