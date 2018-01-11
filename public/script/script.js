    //initial
    var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),
    
    //parameters
    total = w,
    accelleration = .05,
    
    //afterinitial calculations
    size = w/total,
    occupation = w/total,
    repaintColor = 'rgba(0, 0, 0, .04)'
    colors = [],
    dots = [],
    dotsVel = [];

//setting the colors' hue
//and y level for all dots
var portion = 360/total;
for(var i = 0; i < total; ++i){
  colors[i] = portion * i;
  
  dots[i] = h;
  dotsVel[i] = 10;
}

function anim(){
  window.requestAnimationFrame(anim);
  
  ctx.fillStyle = repaintColor;
  ctx.fillRect(0, 0, w, h);
  
  for(var i = 0; i < total; ++i){
    var currentY = dots[i] - 1;
    dots[i] += dotsVel[i] += accelleration;
    
    ctx.fillStyle = 'hsl('+ colors[i] + ', 80%, 50%)';
    ctx.fillRect(occupation * i, currentY, size, dotsVel[i] + 1);
    
    if(dots[i] > h && Math.random() < .01){
      dots[i] = dotsVel[i] = 0;
    }
  }
}

anim();




// This is the funtion you need to copy
// Copy from line 9 to 34

function autoType(elementClass, typingSpeed) {
    var thhis = $(elementClass);
    thhis.css({
        "position": "relative",
        "display": "inline-block"
    });
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".text-js");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function () {
        thhis.css("opacity", 1);
        thhis.prev().removeAttr("style");
        thhis.text("");
        for (var i = 0; i < amntOfChars; i++) {
            (function (i, char) {
                setTimeout(function () {
                    newString += char;
                    thhis.text(newString);

                }, i * typingSpeed);
            })(i + 1, text[i]);
        }

       
    }, 1000);
}


// Now to start autoTyping just call the autoType function with the 
// class of outer div
// The second paramter is the speed between each letter is typed.   
autoType(".type-js", 150);
setTimeout(function () {
    $('.cursor').css("display", "none")
    autoType(".type-js1", 150);
}, 2000)
setTimeout(function () {
    $('.cursor').css("display", "none")
    autoType(".type-js2", 150);
},5000)
setTimeout(function () {
    $('.cursor').css("display", "none")
    autoType(".type-js3", 150);
}, 9000)





function showForm(event) {
    $(event.data.arg).show('slow');
};
function hideForm(event) {
    $(event.data.arg).hide('slow');
};

function ajaxReg(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/regist', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            $('#regErr').text('Server error');
        };
        if (xhr.status === 200) {
            if (xhr.response) {
                if (JSON.parse(xhr.response).surname !== undefined) {
                    $('#userName').val('');
                    $('#userSurname').val('');
                    $('#userEmail').val('');
                    $('#userPassword').val('');
                    $('#passConfirm').val('');
                    $('#regErr').text('');
                    $("#regForm").hide('slow');
                    $('#userEmail').css("box-shadow", "none");

                    $('#user_info').text(`Registration Success!. Sign in to your account`);
                    setTimeout(function () {
                        $('#user_info').text('');
                    }, 5000);

                }
                if (JSON.parse(xhr.response).errmsg !== undefined) {
                    $('#userEmail').css("box-shadow", "0px 0px 80px red")
                    $('#regErr').text('Duplicate email error');
                }
            }

        } else {

            console.log(xhr.status + '-' + xhr.statusText);
        }
    }
};

$('#singInBtn').on('click', { arg: "#loginForm" }, showForm);
$('#singInBtn').on('click', { arg: "#regForm" }, hideForm);
$('#singUpBtn').on('click', { arg: "#regForm" }, showForm);
$('#singUpBtn').on('click', { arg: "#loginForm" }, hideForm);

$('#send').on('click', function () {
    event.preventDefault();
    if ($('#userName').val() &&
        $('#userSurname').val() &&
        $('#userEmail').val() &&
        $('input[name="gender"]:checked').val() &&
        $('#userPassword').val() &&
        (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test($('#userEmail').val())
    ) {
        if ($('#userPassword').val() === $('#passConfirm').val()) {
            var regData = {
                name: $('#userName').val(),
                surname: $('#userSurname').val(),
                email: $('#userEmail').val(),
                gender: $('input[name="gender"]:checked').val(),
                password: $('#userPassword').val()
            }
            ajaxReg(regData);


            $('#regErr').text('');
            $('#passConfirm').css("box-shadow", "none");
        } else {
            $('#regErr').text('Password and Confirmation do not match!');
            $('#passConfirm').css("box-shadow", "0px 0px 80px red")
        }
    } else {
        $('#regErr').text('Fill in all the fields and check the password and emaila');
    }
});


function ajaxLog(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
            console.log(xhr.response);
            if (xhr.response) {
                var info = JSON.parse(xhr.response);
                if (info.user) {
                    alert(`Success!
                            Your name : ${info.user.name} 
                            Your surname : ${info.user.surname} 
                            Your gender : ${info.user.gender}
                            Your email : ${info.user.email} 
                            Your registration date : ${info.user.cerated}`);
                    $('#loginEmail').val('');
                    $('#loginPassword').val('');
                    $('#loginEmail').css("box-shadow", "none");
                    $('#loginPassword').css("box-shadow", "none");
                    $("#loginForm").hide('slow');
                    $("#singUp").hide('slow');
                    $("#singIn").hide('slow');


                } else if (info.emailErr) {
                    $('#logErr').text(`${info.emailErr}`);
                    $('#loginEmail').css("box-shadow", "0px 0px 100px red");
                } else if (info.passErr) {
                    $('#logErr').text(`${info.passErr}`);
                    $('#loginEmail').css("box-shadow", "0px 0px 80px rgb(0, 255, 0)");
                    $('#loginPassword').css("box-shadow", "0px 0px 80px red");
                }
            }

        } else {
            console.log(xhr.status + '-' + xhr.statusText);
        }
    }
}
$('#login').on('click', function () {
    event.preventDefault();
    if ($('#loginEmail').val() &&
        $('#loginPassword').val()
    ) {
        var loginData = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        }
        ajaxLog(loginData);
        $('#logErr').text('');
    } else {
        $('#logErr').text('Email or Password entered incorrectly');
    }



});


// $('#login').on('click', function () {
//     if (!$('#loginEmail').val() ||
//         !$('#loginPassword').val()) {
//         event.preventDefault();
//         $('#logErr').text('Email or Password entered incorrectly');
//     }

// });

$('.close>img').on('click', { arg: "#regForm" }, hideForm);
$('.close>img').on('click', { arg: "#loginForm" }, hideForm);



