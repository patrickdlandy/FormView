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



