Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :show]
    resource :session, only: [:create, :destroy]
    resources :forms, only: [:create, :show, :index, :edit, :update, :destroy]
    resources :elements, only: [:create, :show, :index, :update, :destroy]
    resources :options, only: [:create, :show, :index, :update, :destroy]
    resources :responses, only: [:create, :show, :index]
  end
end



