class Api::ElementsController < ApplicationController

  def index
      if current_user
        #The hacky solution I will use for now is to get all of the current user's form elements
        #and put them into the front-end state.
        current_forms = current_user.forms
        @elements =  []
        current_forms.each do |current_form|
          current_form.elements.each do |element|
            @elements.push(element)
          end
        end
        puts @elements
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