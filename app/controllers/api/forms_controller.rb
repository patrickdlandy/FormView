class Api::FormsController < ApplicationController
    def create 
        @form = Form.new(form_params)
        if @form.save
            render :show
        else
            render json: @form.errors.full_messages, status: 406
        end
    end

    def show
        @form = Form.find(params[:id])
    end

    def index
        if current_user
            @forms = current_user.forms
        else
            render json: ['Form index restricted if signed out'], status: 401
        end
    end

    def edit
        @form = Form.find(params[:id])
        #I need to update the form with the edited form params and render errors to json
        #if it is not successful. Maybe use .update!? and form params.  Might need jbuiler.
        #Definitely need to update rails routes.
    end

    private

    def form_params
        params.require(:form).permit(:name, :user_id, :description)
    end

end