class ApplicationController < ActionController::API
    before_action :require_login

    # include ActionController::RequestForgeryProtection
    # protect_from_forgery with: :exception
    # before_action :require_jwt

    # def require_jwt
    #   token = request.headers["HTTP_AUTHORIZATION"]
    #   if !token
    #     head :forbidden
    #   end
    #   if !valid_token(token)
    #     head :forbidden
    #   end
    # end
  
    # private
    # def valid_token(token)
    #   unless token
    #     return false
    #   end
  
    #   token.gsub!('Bearer ','')
    #   begin
    #     decoded_token = JWT.decode token, Rails.configuration.x.oauth.jwt_secret, true
    #     return true
    #   rescue JWT::DecodeError
    #     Rails.logger.warn "Error decoding the JWT: "+ e.to_s
    #   end
    #   false
    # end


    def encode_token(payload)
        JWT.encode(payload, 'my_secret')
    end

    def auth_header
        request.headers['Authorization']
    end

    def decoded_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, 'my_secret', true, algorithm: 'HS256')
            rescue JWT::DecodeError
                []
            end
        end
    end

    def session_user
        decoded_hash = decoded_token
        if !decoded_hash.nil? 
            user_id = decoded_hash[0]['user_id']
            @user = User.find_by(id: user_id)
        else
            nil 
        end
    end

    def logged_in?
        !!session_user
    end

    def require_login
     render json: {message: 'Please Login'}, status: :unauthorized unless logged_in?
    end
end
