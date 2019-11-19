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

 def create
    @element = Element.new(element_params)
    if @element.save
      render :show
    else
      render json: @element.errors.full_messages, status: 406
    end
 end

 def update
    @element = Element.find(params[:element][:id])
    if @element.update(element_params)
        render :show
    else
        render json: @element.errors.full_messages, status: 406
    end
 end

 private

 def element_params
    params.require(:element).permit(:title, :body, :form_id, :order, :element_type)
 end


end