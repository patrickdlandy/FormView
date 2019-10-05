export const signup = function(user) {
  return $.ajax({
    method: "POST",
    url: "api/users",
    data: {
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    }
  });
}

export const login = function(user) {
  // debugger
  return $.ajax({
    method: "POST",
    url: "api/session",
    data: {
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    }
  });
}

export const logout = function() {
  return $.ajax({ 
    method: "DELETE", 
    url: "api/session" 
  });
}