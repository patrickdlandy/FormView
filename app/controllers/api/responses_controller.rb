class Api::ResponsesController < ApplicationController
    def create 
        @response = Response.new(response_params)
        if @response.save
            render :show
        else
            render json: @response.errors.full_messages, status: 406
        end
    end

    def show
        @response = Response.find(params[:id])
    end

    def index
        @responses = []
        if current_user
            current_user.forms.each do |form|
                form.elements.each do |element|
                    element.options.each do |option|
                        @responses.concat(option.responses)
                    end
                end
            end
        else
            render json: ['Response restricted if signed out'], status: 401
        end
    end

    private

    def response_params
        params.require(:response).permit(:id, :option_id, :identifier)
    end

end