class DashboardController < ApplicationController
    skip_before_action :require_login
    def index
    end
    def new
    end
end