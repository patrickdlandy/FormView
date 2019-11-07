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
    end

    def update
        #This will happen on submit of the edit form.

        #Why can I not access the form id from params here??
        #The error is ActiveRecord::RecordNotFound - Couldn't find Form with 'id'=undefined:
            #app/controllers/api/forms_controller.rb:33:in `update'

        #how do I get the current form object?

        p params
        @form = Form.find(params[:form][:id])
        p @form
        
        @form.update!(form_params)

        #param is missing or the value is empty: form:

        #may want to render errors here
    end

    private

    def form_params
        params.require(:form).permit(:id, :name, :user_id, :description)
    end

end