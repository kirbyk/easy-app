var activeView = 0;
var enabled = true;
var bgname;
var views = [
    '#mainInput',
    '#updatesInput',
    '#mentorsInput',
    '#prizesInput',
    '#scheduleInput'
];
var viewIDs = [
    '#main',
    '#updates',
    '#mentors',
    '#prizes',
    '#schedule'
];

//to get names in easy format
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

function getbgvalue() {
    return bgname;
}

function toggleTheme(el) {
    console.log(el);
    if (el == 'light') {
        $('#light').addClass('selected');
        $('#dark').removeClass('selected');
        $("#mobile-preview-content").contents().find('ion-nav-bar, .tabs').css('background-color', '#ECF0F1');
        $("#mobile-preview-content").contents().find('.tab-item .icon, .tab-item .tab-title, .title').css('color', '#2C3E50');
    }
    else {
        $('#dark').addClass('selected');
        $('#light').removeClass('selected');
        $("#mobile-preview-content").contents().find('ion-nav-bar, .tabs, .bar').css('background-color', '#2C3E50');
        $("#mobile-preview-content").contents().find('.tab-item .icon, .tab-item .tab-title, .title').css('color', 'white');
    }
}


$(document).ready(function() {




    $('.thumb').click(function(event) {
        $('.thumb').removeClass('clicked');
        $(this).addClass('clicked');
        bgname = $(this).children().attr('class') + '.png';
        bgname = 'url("img/thumbnails/' + bgname + '")';
        $("#mobile-preview-content").contents().find('.pane').css({'background-image':bgname});
    });


    $('#main').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            console.log("Get element: "+viewIDs[activeView]);
            // document.getElementById('#main').style.opacity = 1.0;
            activeView = 0;
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#mainInput').fadeIn(250);
        });
    });
    $('#updates').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            // document.getElementById(viewIDs[activeView]).style.opacity = 1.0;
            activeView = 1;
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#updatesInput').fadeIn(250);
        });
    });
    $('#mentors').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            // document.getElementById(viewIDs[activeView]).style.opacity = 1.0;
            activeView = 2;
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#mentorsInput').fadeIn(250);
        });
    });
    $('#prizes').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            // document.getElementById(viewIDs[activeView]).style.opacity = 1.0;
            activeView = 3;
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#prizesInput').fadeIn(250);
        });
    });
    $('#schedule').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            // document.getElementById(viewIDs[activeView]).style.opacity = 1.0;
            activeView = 4;
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#scheduleInput').fadeIn(250);
        });
    });

    $('#main').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });
    $('#updates').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });
    $('#mentors').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });
    $('#prizes').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });
    $('#schedule').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });



    var myDataRef = new Firebase('https://easy-app.firebaseio.com/');

    //mentor additions
    var mentorRef = myDataRef.child("mentors")
    $('#addMentor').click(function() {
        //recieve new values
        var company = $('#mentorCompanyInput').val();
        var name = $('#mentorNameInput').val();
        var skills = $('#mentorDescriptionInput').val();

        //add the new mentorif fields not empty
        if(company != '' && name != '' && skills != '') {
            mentorRef.child(company).push({name: name, skills: skills});
            $('#mentorNameInput').val('');
            $('#mentorCompanyInput').val('');
            $('#mentorDescriptionInput').val('');
            enabled = false;
        }
        else if (enabled)
            alert("Please fill in all of the fields.");
    });
    mentorRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    //update additions
    var updateRef = myDataRef.child("updates");
    $('#addUpdate').click(function() {
        //recieve new values
        var header = $('#updateNameInput').val();
        var subheader = $('#updateDescInput').val();

        var currentDate = new Date();
        var dateString = (currentDate.getHours()%12.0) + ":" + currentDate.getMinutes();
        if (currentDate.getHours() > 12.0) {
            dateString += " PM";
        }
        else {
            dateString += " AM";
        }

        //add the new mentor if fields not empty
        if (header !== '' && subheader !== '') {
            $('#updateNameInput').val('');
            $('#updateDescInput').val('');
            updateRef.push({createdAt: dateString, header: header, subheader: subheader});
            enabled = false;
        }
        else if (enabled) {
            alert("Please fill in all of the fields.");
        }
    });
    updateRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    //prize additions
    var prizeRef = myDataRef.child("prizes")
    $('#addPrize').click(function() {
        //recieve new values
        var company = $('#prizeCompanyNameInput').val();
        var title = $('#prizeTitleInput').val();
        var desc = $('#prizeDescInput').val();
        var award = $('#prizeAwardInput').val();

        //add the new mentor when fields populated
        if(company != '' && title != '' && desc != '' && award != '') {
            prizeRef.push({award: award, company: company, title: title, description: desc});
            $('#prizeCompanyNameInput').val('');
            $('#prizeTitleInput').val('');
            $('#prizeDescInput').val('');
            $('#prizeAwardInput').val('');
            enabled = false;
        }
        else if (enabled)
            alert("Please fill in all of the fields.");
    });
    prizeRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    //schedule additions
    var scheduleRef = myDataRef.child("schedule")
    $('#addEvent').click(function() {
        //recieve new values
        var header = $('#scheduleNameInput').val();
        var description = $('#scheduleDescInput').val();
        var time = $('#scheduleTimeInput').val();
        var unparsedDate = document.getElementById('scheduleDateInput').valueAsDate;
        var date = weekday[unparsedDate.getDay()] + ", " + month[unparsedDate.getMonth()] + " " + unparsedDate.getDate() + ", " + unparsedDate.getFullYear();
        var location = $('#scheduleLocationInput').val();

        //add the new mentor if fields not empty
        if(date != null && header != '' && description != '' && time != '' && location != '') {
            scheduleRef.child(date).push({header: header, description: description, time: time, location: location, unparsedDate: unparsedDate});
            $('#scheduleNameInput').val('');
            $('#scheduleDescInput').val('');
            $('#scheduleDateInput').val('');
            $('#scheduleTimeInput').val('');
            $('#scheduleLocationInput').val('');
            enabled = false;
        }
        else if (enabled)
            alert("Please fill in all of the fields.");
    });
    scheduleRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    $('#buildBTN').click(function() {
        //send a connect to the server indicating build
        var socket = io();

        //send the colors chosen
        if($('#scheduleLocationInput').val() != '') {
            socket.emit('build request');
        }
        else
            alert("Your event needs a name!!");
        // socket.emit('build request', {appName: "POTATO",
        //                               color1: $('#colorMain').val(),
        //                               color2: $('#colorSecondary').val(),
        //                               color3: $('#colorHighlight').val(),
        //                               imageName: "blah.jpg"});

        //reset the colors
        // $('#colorMain').val('');
        // $('#colorSecondary').val('');
        // $('#colorHighlight').val('');
    });

    //handle image loading (logo)
    function handleFileSelect(evt) {
        console.log("In handle");
        var f = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            console.log("In load");
            return function(e) {
                var filePayload = e.target.result;
                var imageLocation = myDataRef.child('/logoImage');
                console.log("In sending!!");


                document.getElementById("logo").src = e.target.result;

                imageLocation.set(filePayload, function() {
                    console.log("BONSAI");

                    document.getElementById("logo").src = e.target.result;
                    //$('#file-upload').hide();
                });
            };
        })(f);
        reader.readAsDataURL(f);
    }

    function successfulUpdate() {
        window.setTimeout(function() {
            enabled = true;
        }, 1000);
        console.log("Application updated");
        //add later a green fade in.
        $('#updateField').val('Application Update Successful!');
        $('#updateField').fadeIn(250, function() {
            $('#updateField').fadeOut(30000);
        });
    }
});
