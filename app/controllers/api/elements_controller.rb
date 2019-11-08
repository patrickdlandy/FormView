class Api::ElementsController < ApplicationController

  def index
      if current_user
        #need to list current elements only... only the elements associated with the current form
        #params will include the current form
          @elements = Form.find(params[:id]).elements
          puts @elements
      else
          render json: ['Form elements restricted if signed out'], status: 401
      end
  end

end