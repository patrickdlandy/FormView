json.extract! user, :username, :id, :email
json.authored_form_ids user.forms.pluck(:id)