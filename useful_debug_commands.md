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

I need a branch. Committing now.


Trying to figure out what this company is talking about in Luna Coffee:

Meeting about some sort of app with users, passwords, advocates??, sensors in buildings, humidity, temperature, violations, heroku databases, columbia makerspace, admin vs user accounts for each sensor, trend data, github, open source, founders at meeting!
Hardware, data, scaling...

Found it. Heat Seek.


this.props.form.form_element_ids.forEach(function(id) {
                 return (
                     <div className="question-container">
                         <h3>{local_elements[id]}</h3>
                     </div>
                 )
             }) 

VERY WEIRD BUG

There is an inconsistency in the format of my front end state form objects: some of them have a key of 'form_element_ids' and some have a key of 'element_ids.' Mysterious! I found this by inserting a debugger in my renderElements function in the react component and checking the form object's keys when loading different forms. 

Looks like a jbuilder issue! Index and Show had different keys names.

Ok, so what is the plan for getting form elements all the way from seeds to form_show?

1. Add route (index) x
2. Add controller x
3. Add jbuilder + api util and test x
4. Add actions and action creators x
5. Add reducers for options and option errors x
6. Add to MDP for form show container
7. Add to element render function in form_show


Feedback on MVPs:

Check for uniqueness of email on form response (form show page without login).

Possible /share 

Part A: of "Share Forms": user can see with shared link
Part B: User can answer and responses will persist (related to display results MVP).

Going to need a joins table for question/response.

DO response aggregation with JBuilder.

Last MVP is various question types.

Responses: polymorphic????

For general personal pitch:
Add name drop.
more personal info to "stand out" or make them smile (based on specific company).
more tech details on project I choose to focus on (languages).

For Thursday:

30 seconds
Name, Engineering at Cornell, software engineer, here are projects.
Focus role rather than company
Practice talking about specific tech based on what they are hiring for.

https://boards.greenhouse.io/aclu/jobs/4491475002#application

Personal Pitch updated:

Hi, I'm Patrick.  (Personal Pitch)

-I graduated from Cornell Engineering and I'm a licensed Professional Engineer. 

-After working in the construction industry for a few years, I'm now satisfying my long-standing interest in computers and software. 

-Middle school

-Freshman at Cornell, Java

-Recently, working on a Full Stack project (talk tech)

-What I learned will allow me to hit the ground running at Ribbon.

-I'm excited about the potential of information technology in the real estate space, and I think it's a fitting transition for me after working directly on buildings for four years.

Comments on GFI application:

-Rephrase "less than ideal"
-Don't mention App Academy Project
-"I will refer to my current experience as an App Academy TA for the Jump Start Program"
-Don't say "I have not had opportunities."

What are my issues? Thoughts on Friday, 11/22

I have a problem when I refresh the FormEdit page:

'cannot read property name of undefined' 

I believe that this means that a form (with the name key) is not loaded when the method attempts to key into a form object.  How can I fix this?

//create a method to get the form data into component state that will be called 
    //after the form is loaded (to fix the refresh bug). I think this is solved!

    //I solved this problem using the apprach of setting the component state after the form is
    //loaded.


I am also having a phantom repeated clearElementErrors issue.

Violation: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.

This is happening after a massive number of CLEAR_ELEMENT_ERRORS actions being dispatched.

There is a console log that appears each time with each CLEAR_ELEMENT_ERRORS... The problem appears to be in renderElementEdits.

I fixed two issues, and this appeared to go away. First, I corrected a misnamed constant from "CLEAR_ELEMENT_ERRORS" to "CLEAR_OPTION_ERRORS".
Second, I stopped clearing option errors when unmount.

https://boards.greenhouse.io/embed/job_app?token=737677

OK, back to work after code challenge.  

Collin had feedback on the full stack project (11/25):

Adjustments on current progress:
add “edit” button to form show page and “preview” or “view form” button to edit page
after saving, redirect to the form show
Display Results

start with a table or list of stats
check out react-recharts
backend table for option-response-cookie
component state

add a name: question.id attribute to radio inputs
handleRadioSelection should probably be a higher-order function that takes in the question id and returns and event handler

const handleRadioSelection = (questionId, optionId) => {
return event => {
  this.setState({
    /* use the inputs to do something*/
  });
};
};


submit

Share Form
We can use the show component but check for signedIn user
Either create a new component based on the same component but try to use a new container with the same component first and some kind of props boolean
either use a protected route and a public route with the same url pattern
OR you can have a frontend route that uses /share/:formId
Multiple Question Types (back burner—work additional types as you job search)


Before I do anything else, I will add an edit button to the form show page leading to the form edit page.

I will also redirect to the form show page when form elements and options are updated.

DONE and DONE and deployed.

clear form errors on component state change?? Form data change?
fix styling on form edit (layout)

I really need to actually brainstorm about this:

How should I store a response?

If I send people to a public link, there needs to be a form page that is accessible to the public that will track responses.

I don't want to have to make users sign in to take a survey, but it would be nice 
to be able to identify each response somehow. What can I do with cookies?

Maybe I can log response option_ids with timestamps to start with and include a column 
for some future functionality (like IP address??)

Ok. So I would have this response table that a single form would presist data to on submit.

Any "selected option" in the component state of the survey would be persisted to this table on submit.  I'll just put a blank string in there for IP address for now.

So the schema for the response table will simply have attributes for :id, :option_id (foreign key pointing to selected option), :identifier (string), and timestamps.  
For now, the application will simply utilize the :option_id and timestamps.

I will build this from the bottom up starting with the database table.

