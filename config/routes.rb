Rails.application.routes.draw do
  root 'dashboard#index'
  resources :dashboard, only: [:index, :new]

  namespace :api do
    namespace :v1 do
      post "/login", to: "auth#login"   
      get "/auto_login", to: "auth#auto_login"   
      get "/user_is_authed", to: "auth#user_is_authed"
      resources :users,  param: :id
    end
  end

  # Reactjs switch in use. This is root route for react js
  get '*path', to: 'dashboard#index', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
