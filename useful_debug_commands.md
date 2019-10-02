testing create user and session sign in/sign out in window:

window.currentUser

$.ajax({method: "POST", url: "api/users", data: { user: { username: "Rachel Carson", email: "rc@silentspring.net", password: "123456" } } })

$.ajax({method: "POST", url: "api/session", data: { user: { username: "Rachel Carson", email: "rc@silentspring.net", password: "123456" } } })
$.ajax({method: "DELETE", url: "api/session"})