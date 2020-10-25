class PagesController < ActionController::Base
    skip_before_action :require_login
    def index
        hello = "Hello"
        @pages = hello
    end
    def show
    end
end