var app = angular.module("safarApp", []);

//other functions
function tes(x) {
  var xhttp = new XMLHttpRequest(); 
  xhttp.open("POST", "/api/edituser", true);
  var par = "action=" + document.getElementById("adminaction").value + "&newval=" + document.getElementById("newvaluebox").value
  + "&id="+x;
  xhttp.onreadystatechange = function() { 
      if (this.readyState == 4 && this.status == 200) {
          var obj = JSON.parse(this.responseText);
          $('#editUser').modal('toggle');
          $(document).ready(function(){
              $("#error").html(obj.msg);
              $('#myModal').modal("show");
          });
          $('#aid').empty();
      } 
  };
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  xhttp.send(par);
}

var tripData = function($http) {
    return $http.get("/api/trips/get");
};

var userList = function($http) {
    return $http.get("/api/users/gets");
}

var compList = function($http) {
  return $http.get("/api/company/get");
}

var parentCtrl = function($scope) {
  $scope.tst = "XD";
  $scope.setEdit = function(x) {
    $scope.editing = x;
    $(document).ready(function(){
      $("#un").html(x.Username);
      $('#editUser').modal("show");
    });
  };
  
  $scope.atteptEU = function() {
    tes($scope.editing._id);
  }
};
var tripCtrl = function($scope, tripData) {
    tripData.success(function(data) {
        $scope.data = { trips: data };
      })
      .error(function(e) {
        console.log(e);
      });
  };

var showUserList = function() {
    var x = document.getElementById("showUsers");
    x.style.display = "block";
}
  
var aCtrl = function($scope, userList) {
    userList.success(function(data) {
          $scope.data = {ausers: data};
      })
      .error(function(e) {
          console.log(e);
      });
}

var compCtrl = function($scope, compList) {
  compList.success(function(data) {
        $scope.companies = data;
    })
    .error(function(e) {
        console.log(e);
    });
}


  angular
  .module("safarApp")
  .controller("tripCtrl", tripCtrl)
  .controller("parentCtrl", parentCtrl)
  .controller("aCtrl", aCtrl)
  .controller("compCtrl", compCtrl)
  .service("tripData", tripData)
  .service("userList", userList)
  .service("compList", compList)
  
  