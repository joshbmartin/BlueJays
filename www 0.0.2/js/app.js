function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    /*
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    */

    //document.cookie = "idCookie" +"=" + profile.getId() + ";domain=iustutor.me;path=/";
    
    document.cookie = "idCookie=" + profile.getId() + "; path=/";
    //POST
    $.ajax({
        url: "http://iustutor.me/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": profile.getId(),
            "name": profile.getName(),
            "image_url": profile.getImageUrl(),
            "email": profile.getEmail()
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });

    window.location.href = "http://iustutor.me/dashboard.html";
};

function adminOnSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    document.cookie = "idCookie=" + profile.getId() + "; path=/";
    //POST
    $.ajax({
        url: "http://iustutor.me/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": profile.getId(),
            "name": profile.getName(),
            "image_url": profile.getImageUrl(),
            "email": profile.getEmail()
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });

    window.location.href = "http://iustutor.me/adminpanel.html";
};



function getUser() {


    var id = getCookie("idCookie");
    //alert(id);
    var returndata;
    //GET
    $.ajax({
        url: "http://iustutor.me/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    //alert(returndata[0]["name"]);
    document.getElementById("name").innerHTML = returndata[0]["name"];
    // document.getElementById('pic').innerHTML = "<h3>"+ returndata[0]["name"] + "</h3>" +
    // "<img src="+returndata[0]["image_url"] + ">";
        
    document.getElementById('pic').innerHTML = "<img alt=\"User Pic\" src=\"" +
    returndata[0]["image_url"] + "\" class=\"img-circle img-responsive\">"
    //document.write();
    
    document.getElementById("email").innerHTML = returndata[0]["email"];

    if (returndata[0]["major"] != null) {
        document.getElementById("major").innerHTML = returndata[0]["major"];
    }

    if (returndata[0]["minor"] != null) {
        document.getElementById("minor").innerHTML = returndata[0]["minor"];
    }

    if (returndata[0]["dob"] != null) {
        document.getElementById("dob").innerHTML = returndata[0]["dob"];
    }

    if (returndata[0]["gender"] != null) {
        document.getElementById("gender").innerHTML = returndata[0]["gender"];
    }

    if (returndata[0]["city"] != null && returndata[0]["state"] != null) {
        document.getElementById("address").innerHTML = returndata[0]["city"] + ", " +
        returndata[0]["state"];
    }

    if (returndata[0]["phone"] != null) {
        document.getElementById("phone").innerHTML = returndata[0]["phone"];
    }

}

function editUser() {
    var id = getCookie("idCookie");
    //alert(id);
    var returndata;
    //GET
    $.ajax({
        url: "http://iustutor.me/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    //alert(returndata[0]["name"]);
    document.getElementById("name").innerHTML = returndata[0]["name"];
    // document.getElementById('pic').innerHTML = "<h3>"+ returndata[0]["name"] + "</h3>" +
    // "<img src="+returndata[0]["image_url"] + ">";
        
    document.getElementById('pic').innerHTML = "<img alt=\"User Pic\" src=\"" +
    returndata[0]["image_url"] + "\" class=\"img-circle img-responsive\">"
    //document.write();
    
    document.getElementById("email").innerHTML = returndata[0]["email"];
    
    //major edit
    if (returndata[0]["major"] != null) {
        document.getElementById('major').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"majorInput\" value= \"" +
        returndata[0]["major"] + "\" >";
    } else {
        document.getElementById('major').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"majorInput\" placeholder= \"Major\" >";
    }

    if (returndata[0]["minor"] != null) {
        document.getElementById('minor').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"minorInput\" value= \"" +
        returndata[0]["minor"] + "\" >";
    } else {
        document.getElementById('minor').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"minorInput\" placeholder= \"Minor\" >";
    }

    if (returndata[0]["dob"] != null) {
        document.getElementById('dob').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"dobInput\" value= \"" +
        returndata[0]["dob"] + "\" >";
        /*document.getElementById('dob').innerHTML =
        "<input type= \"date\" class=\"form-control\" id= \"dobInput\" placeholder= \"" +
        returndata[0]["dob"] + "\" >";*/

    } else {
        document.getElementById('dob').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"dobInput\" placeholder= \"mm/dd/yyyy\" >";
        /*
        document.getElementById('dob').innerHTML =
        "<input type= \"date\" class=\"form-control\" id= \"dobInput\" placeholder= \"\">";
        //$("#dobInput").datepicker("setDate", new Date());
        */
    }


    if (returndata[0]["gender"] != null) {
        $("#genderSelect").val(returndata[0]["gender"]);
    } else {
        $("#genderSelect").val("S");
    }

    if (returndata[0]["city"] != null && returndata[0]["state"] != null) {
        document.getElementById('address').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"cityInput\" value= \"" +
        returndata[0]["city"] + "\" >" +
        "<input type= \"text\" class=\"form-control\" id= \"stateInput\" value= \"" +
        returndata[0]["state"] + "\" >";
    } else {
        document.getElementById('address').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"cityInput\" placeholder= \"City\" >" +
        "<br><input type= \"text\" class=\"form-control\" id= \"stateInput\" placeholder= \"State\" >";
    }

    if (returndata[0]["phone"] != null) {
        document.getElementById('phone').innerHTML =
        "<input type= \"tel\" class=\"form-control\" id= \"phoneInput\" value= \"" +
        returndata[0]["phone"] + "\" >";
    } else {
        document.getElementById('phone').innerHTML =
        "<input type= \"tel\" class=\"form-control\" id= \"phoneInput\" placeholder= \"Phone Number\" >"
    }
}

function saveUser() {
    var id = getCookie("idCookie");
    var gender;

    var e = document.getElementById("genderSelect");
    /*if (e.options[e.selectedIndex].value == "M"){
        gender = "M";
    }*/
    //var value = e.options[e.selectedIndex].value;
    //alert(value);

    $.ajax({
        url: "http://iustutor.me/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": id,
            "major": document.getElementById("majorInput").value,
            "minor": document.getElementById("minorInput").value,
            "dob": document.getElementById("dobInput").value,
            "gender": e.options[e.selectedIndex].value,
            "city": document.getElementById("cityInput").value,
            "state": document.getElementById("stateInput").value,
            "phone": document.getElementById("phoneInput").value
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });

    window.location.href = "http://iustutor.me/accountsettings.html";

}

function getcourses() {
    var returndata;
    var id = getCookie("idCookie");
    //GET email by ID
    $.ajax({
        url: "http://iustutor.me/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    //GET 
    $.ajax({
        url: "http://iustutor.me/php/getstudentcourserelation.php?id=" + returndata[0]["email"],
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });


    var html = "";
    var inc = 0;
    for (var i = 0; i < returndata.length; i++) {
        var coursereturndata;
        //alert(returndata[0]["course_id"]);
        var course_id = returndata[i]["course_id"];
        $.ajax({
            url: "http://iustutor.me/php/getcourse.php?id=" + course_id,
            async: false,
            success: function (data) {
                coursereturndata = data;
            },
            error: function () {
                //alert("Database Error!");
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json"
        });
        
        //alert(coursereturndata[1]["name"]);
        /*
        if (inc == 0){
            html += "<div class=\"row\">";
            html += "<div class=\"col-xs-12 col-md-4\">"+
                    "<div class=\"panel panel-default\">"+
                        "<div class=\"panel-heading\">"+
                           "<h3 class=\"panel-title\">"+coursereturndata[0]["name"]+"</h3>"+
                           //"<h3 class=\"panel-title\">Hey</h3>"+
                        "</div>"+
                        "<div class=\"panel-body\">"+
                            coursereturndata[0]["description"]+
                           //"Description"+
                        "</div>"+
                    "</div>"+
                    "</div>";
            //html += "</div>";
            inc = 0;
        } else if (inc == 2){
            html += "<div class=\"col-xs-12 col-md-4\">"+
                    "<div class=\"panel panel-default\">"+
                        "<div class=\"panel-heading\">"+
                        //"<h3 class=\"panel-title\">Hey</h3>"+
                            "<h3 class=\"panel-title\">"+coursereturndata[0]["name"]+"</h3>"+
                        "</div>"+
                        "<div class=\"panel-body\">"+
                           // "Course Description"+
                           coursereturndata[0]["description"]+
                        "</div>"+
                        "</div>"+
                    "</div>"+
                   "</div>";
        } else {
            html += "<div class=\"col-xs-12 col-md-4\">"+
                    "<div class=\"panel panel-default\">"+
                        "<div class=\"panel-heading\">"+
                        //"<h3 class=\"panel-title\">Hey</h3>"+
                            "<h3 class=\"panel-title\">"+coursereturndata[0]["name"]+"</h3>"+
                        "</div>"+
                        "<div class=\"panel-body\">"+
                           // "Course Description"+
                           coursereturndata[0]["description"]+
                        "</div>"+
                        "</div>"+
                    "</div>";
        }
        
        
        
        inc--;
        */
        if (returndata[i]["is_active"] != false) {
            html += "<div class=\"col-xs-12 col-md-4\">" +
            "<div class=\"panel panel-default\">" +
            "<div class=\"panel-heading\">" +
            //"<h3 class=\"panel-title\">Hey</h3>"+
            "<h3 class=\"panel-title\">" + coursereturndata[0]["name"] + "</h3>" +
            "</div>" +
            "<div class=\"panel-body\">" +
            // "Course Description"+
            coursereturndata[0]["description"] +
            "</div>" +
            "</div>" +
            "</div>";
        }

    }

    document.getElementById('courses').innerHTML = html;


}

function addCourse() {
    var returndata;
    var id = getCookie("idCookie");
    
    //Get email by ID
    $.ajax({
        url: "http://iustutor.me/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    //alert(document.getElementById("addInput").value);
    //alert(returndata[0]["email"]);
    
    //POST
    $.ajax({
        url: "http://iustutor.me/php/addcourse.php",
        async: false,
        data: JSON.stringify({
            "email": returndata[0]["email"],
            "course_id": document.getElementById("addInput").value
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });

    window.location.href = "http://iustutor.me/courses.html";

}

function removeCourse() {
   var returndata;
    var id = getCookie("idCookie");
   
    //Get email by ID
    $.ajax({
        url: "http://iustutor.me/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    //PUT
    $.ajax({
        url: "http://iustutor.me/php/removecourse.php",
        async: false,
        data: JSON.stringify({
            "email": returndata[0]["email"],
            "course_id": document.getElementById("removeInput").value,
            "is_active": false
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });
    
    window.location.href = "http://iustutor.me/courses.html";
}

function findTutor(course_id) {
    
    //alert(course_id);
    var returndata;
    //GET
    $.ajax({
        url: "http://iustutor.me/php/gettutor.php?course_id=" + course_id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    //$("coursecontainer").hide();
    //document.getElementById("coursecontainer").style.visibility = "collapse";
    $('#coursecontainer').hide();
    $('#tutortable').show();
    document.getElementById("tutortable").style.visibility = "visible";
    
    
    //alert("Tutor Name: " + returndata[2]["tutor_name"]);
    
    /* window.location.href = "http://iustutor.me/availabletutors.html";
    //alert("Tutor Name: " + returndata[0]["tutor_name"]);
    $(document).ready(function () {
    document.getElementById('tutortable').innerHTML = "<thead><tr><th>Number of Tutor(s)</th><th>Name</th><th>Subject</th><th>Profile Link</th></tr></thead>";
    document.getElementById('tutortable').innerHTML = "<tr>";
    var i=0;
    while (returndata[i]["tutor_name"] != null){
        document.getElementById('tutortable').innerHTML = "<th scope=\"clickable-row\">1</th><td>"+
        returndata[i]["tutor_name"] +"</td><td>"+course_id+"</td><td><div class=\"alert alert-success\" role=\"alert\"><a href=\"http://iustutor.me/request.html\">View Profile</a></div></td>";
        i++;
    }
    document.getElementById('tutorstable').innerHTML = "</tr>";
    alert("Tutor Name: " + returndata[0]["tutor_name"]);
                /*<!--<th scope="clickable-row">1</th>
                <td>John Doe</td>
                <td>Introduction to Computers and Their Use</td>
                <td><div class="alert alert-success" role="alert"><a href="http://iustutor.me/request.html">Accepted</a></div></td>-->
            </tr>
            });*/
            
    //document.getElementById('tutors').innerHTML = "<thead>\n<tr>\n<th>Number of Tutor(s)</th>\n<th>Name</th>\n<th>Subject</th>\n<th>Profile Link</th>\n</tr>\n</thead>";
    //document.getElementById('tutors').innerHTML = "<tr>";
    //var i=returndata.length;
    //alert(returndata[2]["tutor_name"]);
    console.log(returndata.length);
    var html = "";

    for (var i = 0; i < returndata.length; i++) {
        html += "<tr><th scope=\"clickable-row\">" + (i + 1) + "</th><td>" +
        returndata[i]["tutor_name"] + "</td><td>" + course_id + "</td><td><div class=\"alert alert-success\" role=\"alert\"><a href=\"http://iustutor.me/request.html\">View Profile</a></div></td></tr>";
    }

    document.getElementById('tutors').innerHTML = html;
            
    /*while (i != 0){
        document.getElementById('tutors').innerHTML = "<tr><th scope=\"clickable-row\">"+(i-1)+"</th><td>"+
        returndata[i-1]["tutor_name"] +"</td><td>"+course_id+"</td><td><div class=\"alert alert-success\" role=\"alert\"><a href=\"http://iustutor.me/request.html\">View Profile</a></div></td></tr>";
        i--;
    }
    */
            
            
    //document.getElementById('tutors').innerHTML = "</tr>";
            
           

}

function updateIsStudent(tfBool) {
    var id = getCookie("idCookie");
    //PUT
    $.ajax({
        url: "http://iustutor.me/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": id,
            "is_student": tfBool
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}