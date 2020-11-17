class Api::V1::AuthController< ApplicationController
    skip_before_action :require_login, only: [:login, :auto_login, :destroy]
    skip_forgery_protection

    def login
        user = User.find_by(email: params[:email])

        if !user
            render status: :unauthorized
        else
            if user && user.authenticate(params[:password])
                payload = { user_id: user.id }
                payload[:exp] = 30.seconds.from_now.to_i
                # JWT token sent to client to be stored in client memory (state?)
                token = encode_token(payload)
                # HTTP-only cookie stored with refresh_token
                cookies.signed[:jwt] = {value:  token, httponly: true, secure: true, expires: 1.minutes.from_now}
                # render json: {user:user, jwt:token, success: "Welcome back, #{user.username}"}
                
                # return json format to client jwt_token and jwt_expire
                render json: {jwt_expire:payload[:exp],  success: "Welcome back, #{user.username}"}
            else
                render status: :unauthorized
            end
        end
    end

    def auto_login
        if session_user
            puts `session user: #{session_user}`
            render json: session_user
        else
            render json: {}
        end
    end

    def destroy
        cookies.delete :jwt
    end
end
