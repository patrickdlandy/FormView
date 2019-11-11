class Api::ElementsController < ApplicationController

  def index
      if current_user
        current_forms = current_user.forms
        @elements =  []
        current_forms.each do |current_form|
          current_form.elements.each do |element|
            @elements.push(element)
          end
        end
      else
          render json: ['Form elements restricted if signed out'], status: 401
      end
  end

  # def show
  #   puts "params:"
  #   puts params
  #   @elements = Form.find(params[:id]).elements
  #   if @elements
  #     puts @elements
  #   else
  #     render json: @form.errors.full_messages, status: 406
  #   end
  # end


end