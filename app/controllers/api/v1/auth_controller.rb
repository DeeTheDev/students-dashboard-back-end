class Api::V1::AuthController< ApplicationController
    skip_before_action :require_login, only: [:login, :auto_login]

    def login
        user = User.find_by(email: params[:email])

        if !user
            render status: :unauthorized
        else
            if user && user.authenticate(params[:password])
                # secret_key = Rails.application.secrets.secret_key[0]
                # token = JWT.encode(user, secret_key)
                payload = { user_id: user.id }
                token = encode_token(payload)
                render json: {user:user,jwt:token, success: "Welcome back, #{user.username}"}
            else
                render status: :unauthorized
            end
        end
    end

    def auto_login
        if session_user
            render json: session_user
        else
            render json: {errors: "No User Logged In"}
        end
    end
end
