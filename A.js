$(document).ready(function() {
    // Login Form Submit Event
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        if (username == 'naseem1112' && password == '03025102808') {
            // Correct Username and Password
            window.location.href = 'software.html';
        } else {
            // Incorrect Username and Password
            alert('Sorry, incorrect username or password.');
        }
    });
});
