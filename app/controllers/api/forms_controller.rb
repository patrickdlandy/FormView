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
        #edit will return an html form to edit with pre-filled fields
    end

    def update
        #This will happen on submit of the edit form.
        @form = Form.find(params[:id])
        @form.update!(form_params)
        #may want to render errors here
    end

    private

    def form_params
        params.require(:form).permit(:name, :user_id, :description)
    end

end