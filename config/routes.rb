Fantasyxi::Application.routes.draw do

  root :to => "Players#index"

  match "/auth/facebook/callback" => "sessions#create"
  match "/logout" => "sessions#destroy", :as => :logout

  match "leagues/:id/join" => "leagues#join"
  match "leagues/:id/leave" => "leagues#leave"
  match "leagues/:id/remove_user" => "leagues#remove_user"
  match "leagues/:id/accept" => "leagues#accept"
  match "leagues/:id/decline" => "leagues#decline"

  match "user_teams/:id/spy" => "user_teams#spy"


  resources :players
  resources :leagues

  resources :users
  resources :user_teams

  match 'player_info' => 'user_teams#player_info'
  match 'change_formation' => 'user_teams#change_formation'
  match 'save_team' => 'user_teams#save_team'
  match 'undo_substitution' => 'user_teams#undo_substitution'

  match 'send_invite' => 'leagues#send_invite'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
