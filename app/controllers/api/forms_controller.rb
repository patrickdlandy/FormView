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
        @form = Form.find(params[:form][:id])
        if @form.update(form_params)
            render :show
        else
            render json: @form.errors.full_messages, status: 406
        end
    end

    def destroy
        @form = Form.find(params[:id])
        if @form.destroy
            render :show
        else
            render json: @form.errors.full_messages, status: 406
        end
    end

    private

    def form_params
        params.require(:form).permit(:id, :name, :user_id, :description)
    end

end