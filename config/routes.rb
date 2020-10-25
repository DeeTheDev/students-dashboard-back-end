Rails.application.routes.draw do
  root to: 'pages#index'
  resources :pages, only: [:index, :new]
  # resources :pages

  namespace :api do
    namespace :v1 do
      post "/login", to: "auth#login"   
      get "/auto_login", to: "auth#auto_login"   
      get "/user_is_authed", to: "auth#user_is_authed"
      resources :users
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
