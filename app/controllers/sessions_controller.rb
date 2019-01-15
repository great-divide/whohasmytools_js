class SessionsController < ApplicationController

	def new
		@user = User.new
	end

  def create
  	if request.env['omniauth.auth']
	    @user = User.create_with_omniauth(request.env['omniauth.auth'])
	    session[:user_id] = @user.id    
	    redirect_to user_path(@user)
	  else
		  if User.find_by(username: params[:session][:username])
		  	@user = User.find_by(username: params[:session][:username])
			  if @user.authenticate(params[:session][:password])
			    session[:user_id] = @user.id
			    redirect_to user_path(@user)
			  else
			    redirect_to '/'
		  	end
		  else
		  	redirect_to '/'
		  end
	  end
	end

	def destroy
	  session.delete :user_id
	  redirect_to '/'
	end


end

