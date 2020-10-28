class Api::V1::UsersController < ApplicationController
  # protect_from_forgery
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user
  skip_before_action :require_login
  # def login
  #   user = User.find_by(email: params[:email])

  #   if !user
  #     render status: :unauthorized
  #   else
  #     if user && user.authenticate(params[:password])
  #       secret_key = Rails.application.secrets.secret_key[0]
  #       token = JWT.encode(user, secret_key)
  #       render json: {user:user,jwt:token, success: "Welcome back #{user.username}"}
  #     else
  #       render status: :unauthorized
  #     end
  #   end
  # end
  def index
    users = User.all
    render :json => users
  end

  def show
    user = User.find(params[:id])
    render :json => {user:user}
  end

  def create
    user = User.create(users_params)
    if user.valid?
      # secret_key = Rails.application.secrets.secret_key[0]
      token = encode_token(payload)
      puts token
      render json: {user: user, jwt: token}
    else
      :bad_request
    end
  end
  
  #PUT  api/v1/users/:id
  def update
    user = User.find(params[:id])
    if user.update(users_params)
      :ok
    else
      :bad_request
    end
  end

  private

  def users_params
    params.permit(:username, :email, :password)
  end
end
