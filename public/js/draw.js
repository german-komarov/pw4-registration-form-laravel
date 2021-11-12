function drawMain(html) {
    $('#main').html(html);
}

function drawAfterSubmitText(html) {
    $('#afterSubmitText').html(html);
}

function drawLogin() {
    $('#navbarUl').html('')
    drawMain(loginTemplate)
}

function drawRegistration() {
    drawAfterSubmitText('');
    console.log(isAuthenticated)
    if(!isAuthenticated) {
        drawLogin();
        return;
    }


    $('#navbarUl').html('<li id="usersLi" class="nav-item">\n' +
        '                <a class="nav-link" style="cursor: pointer" onclick="drawUsersTable()">Users</a>\n' +
        '            </li>\n' +
        '            <li id="registrationLi" class="nav-item active">\n' +
        '                <a class="nav-link" style="cursor: pointer" onclick="drawRegistration()">Registration</a>\n' +
        '            </li>\n' +
        '            <li id="logoutLi" class="nav-item">\n' +
        '                <a class="nav-link" style="cursor: pointer" onclick="logout()">Logout</a>\n' +
        '            </li>')


    drawMain(registrationTemplate);
    if (_regions==null) {
        $.ajax({
            url: '/api/regions',
            success: function(data) {
                setRegions(data.regions)
                drawRegions()
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
    }

    $('#registrationForm').append('<button type="button" class="btn btn-primary" onclick="submitRegistration()">Register</button>');

}


function drawRegions() {
    for(let i=0;i<_regions.length;i++) {
        $('#region').append(
            `
                        <option id="${i+1}" value="${_regions[i].id}">${_regions[i].name}</option>
                    `
        );
    }
}

function drawUsersTable() {
    drawAfterSubmitText('');
    $('#navbarUl').html('<li id="usersLi" class="nav-item active">\n' +
        '                <a class="nav-link" style="cursor: pointer" onclick="drawUsersTable()">Users</a>\n' +
        '            </li>\n' +
        '            <li id="registrationLi" class="nav-item">\n' +
        '                <a class="nav-link" style="cursor: pointer" onclick="drawRegistration()">Registration</a>\n' +
        '            </li>\n' +
        '            <li id="logoutLi" class="nav-item">\n' +
        '                <a class="nav-link" style="cursor: pointer" onclick="logout()">Logout</a>\n' +
        '            </li>')
    $('#main').html('' +
        '<div class="col-sm-12">' +
        '<table id="users-table" class="users-table">\n' +
        '                <thead>\n' +
        '                <tr>\n' +
        '                    <th>First Name</th>\n' +
        '                    <th>Last Name</th>\n' +
        '                    <th>Email</th>\n' +
        '                    <th>Phone</th>\n' +
        '                    <th>Region</th>\n' +
        '                    <th>Address</th>\n' +
        '                    <th>Gender</th>\n' +
        '                    <th>Create At</th>\n' +
        '                    <th>Updated At</th>\n' +
        '                    <th>Actions</th>\n' +
        '                </tr>\n' +
        '                </thead>\n' +
        '                <tbody id="users-table-body">\n' +
        '                </tbody>\n' +
        '            </table></div></div></div>')


    $.ajax({
        url: '/api/users',
        method: 'GET',
        headers: {'Authorization': ('Bearer ' + storage.getItem('usersTrackerAuthToken'))},
        success: function (data) {
            let users = data.users;
            setUsers(users);
            drawTableBody();
            $('.users-table').DataTable();
        }
    });




    function drawTableBody() {
        let tbody = $('#users-table-body');
        for(let i=0;i<_users.length;i++) {
            let user = _users[i];
            let createdAt = new Date(Date.parse(user.created_at));
            let updatedAt = new Date(Date.parse(user.updated_at));
            tbody.append(`
                <tr>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.region.name}</td>
                <td>${user.address}</td>
                <td>${user.gender}</td>
                <td>${createdAt.toLocaleDateString('en-US')}  ${createdAt.toTimeString().split('GMT')[0]}</td>
                <td>${updatedAt.toLocaleDateString('en-US')}  ${updatedAt.toTimeString().split('GMT')[0]}</td>
                <td><span><button class="btn btn-primary" onclick="editUser(${user.id}, ${i})">Edit</button><button class="btn btn-danger" onclick="deleteUser(${user.id}, ${i})">Delete</button></span></td>
                </tr>`);
        }
    }

}




