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
            drawUsersTable();
        },
        error: function (xhr,textStatus,errorThrown) {
            switch (xhr.status) {
                case 401: {
                    let message = xhr.responseJSON.message;
                    let html = `<p class="text-danger bg-light">${message}</p>`
                    drawAfterSubmitText(html)
                    break
                } case 422: {
                    let errors = xhr.responseJSON.errors
                    let html = ''
                    for (let key in errors) {
                        html += `<p class="text-danger bg-light">${errors[key][0]}</p>`
                    }
                    drawAfterSubmitText(html)
                    break
                }
            }

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
            _users.push(data.createdUser);
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


function deleteUser(userId, rowNumber) {
    drawAfterSubmitText('')
    console.log("TOKEN " + storage.getItem('usersTrackerAuthToken'))
    $.ajax({
        url: `/api/users/${userId}`,
        method: 'DELETE',
        headers: {'Authorization':('Bearer ' + storage.getItem('usersTrackerAuthToken'))},
        success: function (data) {
            _users.splice(rowNumber, 1);
            document.getElementById('users-table').deleteRow(rowNumber);
        },
        error: function(xhr) {
            switch (xhr.status) {
                case 403:
                    let message = xhr.responseJSON.message;
                    let html = `<p class="text-danger bg-light">${message}</p>`
                    drawAfterSubmitText(html)
                    break
            }
        }
    })
}




function editUser(userId, userIndex) {
    let user = _users[userIndex];
    drawMain(registrationTemplate);
    $('#first_name').attr('value', user.first_name)
    $('#last_name').attr('value', user.last_name)
    $('#email').attr('readonly', true)
    $('#email').attr('value', user.email)
    $('#phone').attr('value', user.phone)
    $('#address').text(user.address)
    $('#gender').attr('value', user.gender)
    if(user.gender==='MALE') {
        $('#male').attr('checked', true)
    } else {
        $('#female').attr('checked', true)
    }
    if (_regions==null) {
        $.ajax({
            url: '/api/regions',
            success: function(data) {
                setRegions(data.regions)
                drawRegions()

                $('#'+user.region.id).attr('selected', true)
            },
            error: function (xhr) {
                switch (xhr.status) {
                    case 401: {
                        logout()
                    }
                }
            }
        })
    } else {
        drawRegions()
        $('#'+user.region.id).attr('selected', true)
    }

    $('#registrationForm').append('<button type="button" class="btn btn-primary" onclick="submitEdit()">Register</button>');
}



function submitEdit() {
    let data = new FormData()
}



function logout() {
    drawLogin();
    storage.removeItem('usersTrackerAuthToken')
}
