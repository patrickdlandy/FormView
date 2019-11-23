class Api::OptionsController < ApplicationController
  def index
    if current_user
      current_forms = current_user.forms
      elements =  []
      @options = []
      current_forms.each do |current_form|
        current_form.elements.each do |element|
          @options.concat(element.options)
        end
      end
    else
      render json: ['Options restricted if signed out']
    end
  end

  def create
    @option = Option.new(option_params)
    if @option.save
      render :show
    else
      render json: @option.errors.full_messages, status: 406
    end
  end

  def update
    @option = Option.find(params[:option][:id])
    if @option.update(option_params)
      render :show
    else
      render json: @option.errors.full_messages, status: 406
    end
  end

 private

    def option_params
        params.require(:option).permit(:id, :title, :element_id, :body, :order, :option_type)
    end


end