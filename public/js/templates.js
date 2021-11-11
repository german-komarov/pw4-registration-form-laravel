let loginTemplate = ' <div class="col-sm-8">\n' +
    '            <form id="loginForm">\n' +
    '                <div class="form-group">\n' +
    '                    <label for="email">Email address</label>\n' +
    '                    <input name="email" type="email" class="form-control" id="email" placeholder="Enter Email">\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="password">Password</label>\n' +
    '                    <input name="password" type="password" class="form-control" id="password" placeholder="Enter Password">\n' +
    '                </div>\n' +
    '                <br>\n' +
    '                <button type="button" class="btn btn-primary" onclick="submitLogin()">Login</button>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div id="afterSubmitText" class="col-sm-4"></div>';

let registrationTemplate = '<div class="col-sm-8">\n' +
    '            <form id="registrationForm">\n' +
    '                <div class="form-group">\n' +
    '                    <label for="first_name">First Name</label>\n' +
    '                    <input name="first_name" type="text" class="form-control" id="first_name" placeholder="Enter First Name">\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="last_name">Last Name</label>\n' +
    '                    <input name="last_name" type="text" class="form-control" id="last_name" placeholder="Enter Last Name">\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="email">Email address</label>\n' +
    '                    <input name="email" type="email" class="form-control" id="email" placeholder="Enter Email">\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="phone">Phone</label>\n' +
    '                    <input name="phone" type="text" class="form-control" id="phone" placeholder="Enter Phone">\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="password">Password</label>\n' +
    '                    <input name="password" type="password" class="form-control" id="password" placeholder="Enter Password">\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="password_confirmation">Password Confirmation</label>\n' +
    '                    <input name="password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Confirm Password">\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="region">Select region</label>\n' +
    '                    <select name="region_id" class="form-control" id="region">\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="address">Address</label>\n' +
    '                    <textarea name="address" class="form-control" id="address" placeholder="Enter Address"></textarea>\n' +
    '                </div>\n' +
    '                <div class="form-check">\n' +
    '                    <input class="form-check-input" type="radio" name="gender" id="male" value="MALE">\n' +
    '                    <label class="form-check-label" for="male">\n' +
    '                        Male\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '                <div class="form-check">\n' +
    '                    <input class="form-check-input" type="radio" name="gender" id="female" value="FEMALE">\n' +
    '                    <label class="form-check-label" for="female">\n' +
    '                        Female\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '\n' +
    '                <br>\n' +
    '                <button type="button" class="btn btn-primary" onclick="submitRegistration()">Register</button>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div id="afterSubmitText" class="col-sm-4"></div>\n' +
    '    </div>'




let usersTable ='';
