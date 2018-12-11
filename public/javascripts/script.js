function getData() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            return this.responseText;
        } 
    }; 
    xhttp.open("GET", "/api/trips/getauto", true); 
    xhttp.send();
}

$(function () {
    'use strict';
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            console.log(this.responseText);
            var dat = JSON.parse(this.responseText); 
            var nhl = $.map(dat, function (team) { return { value: team.TripName, data: team._id}; });
            var teams = nhl;
            console.log(teams);
            $('#autocomplete').devbridgeAutocomplete({
                lookup: teams,
                minChars: 1,
                onSelect: function (suggestion) {
                    window.open("/api/trips/"+suggestion.data,"_self")
                },
                showNoSuggestionNotice: true,
                noSuggestionNotice: 'Sorry, no matching results',
                groupBy: 'category'
            });
        } 
    }; 
    xhttp.open("GET", "/api/trips/getauto", true); 
    xhttp.send();
    
    
});

$(function () {
    $('#loginform').on('submit',function (e) {
        e.preventDefault();
        var xhttp = new XMLHttpRequest(); 
        xhttp.open("POST", "/api/login", true);
        var par = 
        "uname=" + document.getElementById("uname").value + 
        "&pass=" + document.getElementById("pass").value;
        $('#loginModal').modal('toggle');
        xhttp.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200) { 
                var obj = JSON.parse(this.responseText);
                if(obj.ok == "0") {
                    console.log("phew");
                    $(document).ready(function(){
                        $("#error").html(obj.msg);
                        $('#myModal').modal("show");
                    });
                }
                else window.location.reload();
            } 
        };
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send(par);
        

    });
});

$(function () {
    $('#regform').on('submit',function (e) {
        e.preventDefault();
        var xhttp = new XMLHttpRequest(); 
        xhttp.open("POST", "/api/users", true);
        var par = $(this).serialize();
        $('#registerModal').modal('toggle');
        xhttp.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200) { 
                var obj = JSON.parse(this.responseText);

                $(document).ready(function(){
                    $("#error").html(obj.msg);
                    $('#myModal').modal("show");
                });
                
            } 
        };
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send(par);
        

    });
});


function pageReload() {
    location.reload();
}
function changeAdminAction() {
    var input = document.getElementById("adminaction");
    if(input.value == "remove") document.getElementById("newvaluebox").style.display = 'none';
    else document.getElementById("newvaluebox").style.display = 'block';
}

function getUserlist() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            document.getElementById("hi").innerHTML = this.responseText; 
        } 
    }; 
    xhttp.open("GET", "/api/trips/get", true); 
    xhttp.send();
}

function addcomp() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("POST", "/api/company/add", true);
    var par = 
    "cname=" + document.getElementById("cname").value + 
    "&cphone=" + document.getElementById("cphone").value + 
    "&cloc=" + document.getElementById("cloc").value;
    $(function () {
        $('#addComp').modal('toggle');
     });
    xhttp.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            var obj = JSON.parse(this.responseText);
            $(document).ready(function(){
                $("#error").html(obj.msg);
                $('#myModal').modal("show");
            });
        } 
    };
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhttp.send(par);
}

function addtrip() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("POST", "/api/trips/add", true);
    var par = 
    "tname=" + document.getElementById("tname").value + 
    "&tpickup=" + document.getElementById("tpickup").value + 
    "&tdest=" + document.getElementById("tdest").value +
    "&tprice=" + document.getElementById("tprice").value +
    "&tseats=" + document.getElementById("tseats").value +
    "&tstart=" + document.getElementById("tstart").value +
    "&tend=" + document.getElementById("tend").value +
    "&tcomp=" + JSON.parse(document.getElementById("tcomp").value).CompanyName
    ;
    xhttp.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            var obj = JSON.parse(this.responseText);
            document.getElementById("mainTitle").innerHTML = "aaa";
            $('#addTrip').modal("toggle");
            $("#error").html(obj.msg);
            $('#myModal').modal("show");
        } 
    };
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhttp.send(par);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

function addrev() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("POST", "/review/", true);
    var par = 
    "id=" + document.getElementById("tname").value + 
    "&tpickup=" + document.getElementById("tpickup").value + 
    "&tdest=" + document.getElementById("tdest").value +
    "&tprice=" + document.getElementById("tprice").value +
    "&tseats=" + document.getElementById("tseats").value +
    "&tstart=" + document.getElementById("tstart").value +
    "&tend=" + document.getElementById("tend").value +
    "&tcomp=" + JSON.parse(document.getElementById("tcomp").value).CompanyName
    ;
    xhttp.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            var obj = JSON.parse(this.responseText);
            document.getElementById("mainTitle").innerHTML = "aaa";
            $('#addTrip').modal("toggle");
            $("#error").html(obj.msg);
            $('#myModal').modal("show");
        } 
    };
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhttp.send(par);
}


    
