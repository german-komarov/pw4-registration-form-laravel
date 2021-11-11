let storage = window.sessionStorage;
$( document ).ready(function() {

    let token = storage.getItem('usersTrackerAuthToken');

    if(!token) {
        drawMain(loginTemplate);
    } else {
        isAuthenticated = true;
        drawUsersTable();
    }


});


function submitLogin() {
    let formData = new FormData(document.getElementById('loginForm'));
    $.ajax({
        url: 'http://localhost:8000/api/login',
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            storage.setItem('usersTrackerAuthToken', data.token)
            isAuthenticated = true;
            drawUsersTable();
        },
        error: function (xhr,textStatus,errorThrown) {
            switch (xhr.status) {
                case 401: {
                    logout()
                }
            }
            let message = xhr.responseJSON.message;
            let html = `<p class="text-danger bg-light">${message}</p>`
            drawAfterSubmitText(html);
        }
    });
}


function submitRegistration() {
    let formData = new FormData(document.getElementById('registrationForm'))
    $.ajax({
        url: 'http://localhost:8000/api/users',
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        headers: {'Authorization':('Bearer ' + storage.getItem('usersTrackerAuthToken'))},
        success: function(data){
            drawAfterSubmitText('<p class="text-success bg-light">User was successfully created</p>')
            document.getElementById('registrationForm').reset()
        },
        error: function (xhr,textStatus,errorThrown) {
            console.log(xhr)
            let errors = xhr.responseJSON.errors;
            let html = '';
            for (let key in errors) {
                html += `<p class="text-danger bg-light">${errors[key][0]}</p>`
            }
            drawAfterSubmitText(html);
        }
    });
}



function logout() {
    drawLogin();
    storage.removeItem('usersTrackerAuthToken')
}
