testing create user and session sign in/sign out in window:

window.currentUser

$.ajax({method: "POST", url: "api/users", data: { user: { username: "Rachel Carson", email: "rc@silentspring.net", password: "123456" } } })

$.ajax({method: "POST", url: "api/session", data: { user: { username: "Rachel Carson", email: "rc@silentspring.net", password: "123456" } } })
$.ajax({method: "DELETE", url: "api/session"})


<% if current_user %>
      <script>
        window.currentUser = {
          "id": "<%= current_user.id %>",
          "username": "<%= current_user.username %>",
          "email": "<%= current_user.email %>"
        };
      </script>
<% end %>

Notes on html:

jsx errors:

from component inputs can have 'required' and type='email' to handle input errors.  Will work for blank inputs and incorrectly formatted emails.

Bugs:

My errors were not showing up as part of a login form react component. I had 
written a simple session action creator to receive errors, an ansychronous 
action creator to login a user and dispatch any errors, an errors reducer to 
update the state, and a container for the login form component that maps the 
errors in the state to the form props.  I used debuggers and console logs in all
of the above components and the api controller to ensure that errors were 
propely being handled.  I narrowed the issue down to two issues: my action creator and my login form itself. In the asynchronous action creator, I made an error in 
writing the nested callback functions when dispatching actions on login (and the action to receive errors was never being dispatched). After this fix, the 
state reflected signin errors, but my render method in the component simply
did not display them. I determined that I left out a return statement, and the 
errors appeared on my form.

Add minimum width to left nav container to handle window size. DONE

new tab links. DONE  Handle errors and style unti 4 pm. DONE

Next: 3 tables for form creation (no responses yet).

2 components:

1. form builder form
2. form show

Demo login:

log in to seeded user's form index page with button to create new form.

This is identical to normal log in except that it uses credentials in the seed for demo.

To get all forms by a user, use helper method "current_user" and associations to display all forms.


10/8 thoughts

I am currently writing the jbuilder files for my Forms controller. These allow the controller methods to return json objects in a structure that I have control over. These json objects
 SOLID TRIANGLE UNICODE

 &#x25BC;

 this successfully created a form in the terminal:

 dispatch(createForm({form: { name: "Test Survey 2", user_id: 1, description: "Testing testing 1 2 3" }}))

Some notes on my steps for creating form elements:

The form show component is not fetching a single form in the front-end state... it is fetching all the forms.  I need to fix this. 

Is this a JBuilder issue?

NO.  Bug is fixed.  I looked at the server log and found that a GET request for /api/forms was being made.  This originated with a "fetch forms" action; I examined my mapDispatchToProps in the form show container and found that I was dispatching the fetch forms action, not the fetch form action.


What needs to happen in order to display survey elements when I view a form?

1. I need to get the elements associated with the form into the front end state. I am already plucking the element ids and putting them into an array that is being shown in the front-end state. Should I use JBuilder to make another entity using form associations? I will give this a try.

show jbuilder attempt to make an entity for form elements: 

@form.elements.each do |element|
    json.set! element.id do
        json.extract! element, :id, :title, :body, :order
        json.form_id element.pluck(:form_id)
    end
end

This did not work.

I am going to assume that I will need to make my own actions for elements of each form and build my own elements reducer within entities reducer.

OK.  

