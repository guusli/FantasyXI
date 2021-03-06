class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user
  helper_method :user_leagues
  helper_method :current_round

  private

  def current_user
  	@current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def user_leagues
  	@user_leagues ||= current_user.leagues if current_user
  end

  def current_round
    Fantasyxi::Application::ROUND
  end

end