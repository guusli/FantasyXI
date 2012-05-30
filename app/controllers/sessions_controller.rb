class SessionsController < ApplicationController
	def create
		auth = request.env["omniauth.auth"] #hash med information om vår "authentication"
		user = User.find_by_uid(auth["uid"]) || User.create_with_omniauth(auth)#Skapar ny user om uid inte finns i user
		session[:user_id] = user.id#sparar användarens user_id i en session variabel
		session[:access_token] = auth.credentials.token
		redirect_to root_url, :notice => "Signed in!"
	end

	def destroy
	  session[:user_id] = nil
	  redirect_to root_url, :notice => "Signed out!"
	end


end
