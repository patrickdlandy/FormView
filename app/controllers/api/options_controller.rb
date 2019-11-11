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


end