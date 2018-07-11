var myApp = angular.module('myApp',['ngRoute'])
myApp.config(function($routeProvider){
    $routeProvider 
    .when('/',{
        templateUrl : 'pages/login.html',
        controller : 'mainController'
    })
    .when('/signUp',{
        templateUrl : 'pages/signUp.html',
        controller : 'mainController2'
    })
    .when('/home',{
        templateUrl : 'pages/home.html',
        controller : 'mainController3'
    })
    .when('/profile',{
        templateUrl : 'pages/profile.html',
        controller : 'mainController4'
    })
    .when('/messages',{
        templateUrl : 'pages/messages.html',
        controller : 'mainController5'
    })
    .when('/submessage',{
        templateUrl : 'pages/submessage.html',
        controller : 'mainController5'
    })
    .when('/logout',{
        templateUrl: 'pages/logout.html',
        controller: 'logoutController'
    })
   
})


myApp.controller('mainController',['$scope', '$location','$rootScope',function($scope,$location,$rootScope){
$rootScope.logName =""
 $scope.user =''
 $scope.pass =''
 var flag;
    $scope.validate = function(){
            var data = JSON.parse(localStorage.getItem("myobjects"));

            for(var i=0; i<data.length; i++){
                flag = 0;
                if($scope.user == data[i].Username && $scope.pass == data[i].Password) {
                      flag = 1;
                    console.log('Successfully logged in')
                    $location.path('/profile')
                   $rootScope.logName = data[i].Username;
                  sessionStorage.setItem('logName', JSON.stringify(data[i].Username));
                    break;
                } 
            }
                if(flag==0){
                alert("Enter valid credentials")
                }
        
    }

}]);

myApp.controller('mainController2',['$scope', function($scope){
$scope.user = ''
$scope.pwd = ''
$scope.fn = ''
$scope.ln = ''
$scope.mail = ''
$scope.phone = ''
$scope.loc = ''
            
        $scope.store = function(){

            var myobjects = {
                "Username": $scope.user,
                "Password": $scope.pwd,
                "FirstName": $scope.fn,
                "LastName": $scope.ln,
                "Email": $scope.mail,
                "Phone": $scope.phone,
                "Location": $scope.loc
            }

            var data = JSON.parse(localStorage.getItem("myobjects"));

            if (data == null) {
              myArr =[myobjects];
              localStorage.setItem("myobjects", JSON.stringify(myArr));
            } else { 
                data.push(myobjects);
                localStorage.setItem("myobjects", JSON.stringify(data));
            }  
             //  window.location.reload();
}



}]);

myApp.controller('mainController3',['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
//   sessionStorage.clear();
}]);

myApp.controller('logoutController',['$scope','$location', function($scope,$location){
     sessionStorage.clear();
    $location.path('/')
    }]);

myApp.controller('mainController4',['$scope', '$rootScope', function($scope, $rootScope){
$scope.user = ''
$scope.pwd = ''
$scope.fn = ''
$scope.ln = ''
$scope.mail = ''
$scope.phone = ''
$scope.loc = ''

    var data = JSON.parse(localStorage.getItem("myobjects"));
    for(var i=0; i<data.length; i++){
        if(JSON.parse(sessionStorage.getItem('logName'))== data[i].Username) {
           
            $scope.user = data[i].Username
            $scope.pwd = data[i].Password
            $scope.fn = data[i].FirstName
            $scope.ln = data[i].LastName
            $scope.mail = data[i].Email
            $scope.phone = data[i].Phone
            $scope.loc = data[i].Location
        }
        }
    
$scope.store = function(){
    for(var i=0; i<data.length; i++){
        if(JSON.parse(sessionStorage.getItem('logName'))== data[i].Username) {
    data[i].Username  =  $scope.user
    data[i].Password  = $scope.pwd 
    data[i].FirstName = $scope.fn
    data[i].LastName  =  $scope.ln
    data[i].Email = $scope.mail
    data[i].Phone = $scope.phone
    data[i].Location = $scope.loc
        
    localStorage.setItem("myobjects", JSON.stringify(data));

}
}
}
    
}]);

myApp.controller('mainController5',['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
   
    $scope.send = function(){
        var myobjects= {
            "receiver" : $scope.to,
            "message": $scope.message,
            "sender": $rootScope.logName
        }
        var data2 = JSON.parse(localStorage.getItem("messages"));
       
        if(data2 == null)
        {
        localStorage.setItem('messages',JSON.stringify([myobjects]))
        myobjects=null;
        }
else{
       data2.push(myobjects)
       localStorage.setItem('messages',JSON.stringify(data2))
       myobjects=null;
}
    }    
    
    $scope.mess = []
    data2 = JSON.parse(localStorage.getItem("messages"));
    if(data2!=null)
        for(var i=0; i<data2.length; i++)
        {
            if(data2[i].receiver==$rootScope.logName){
                $scope.mess.push(data2[i])
            }
        }

$scope.inside = function($index){
        $rootScope.index = $index;
        // $rootScope.arr = $scope.mess;
        $rootScope.submessage = $scope.mess[$index];
      
        $rootScope.mymessages= $scope.mess[$index].message;
    $location.path('/submessage')
}

$scope.sendmess = '';
$scope.reply = function(){
    var myobjects= {
        "receiver" : $rootScope.submessage.sender,
        "message": $scope.sendmess,
        "sender": $rootScope.logName
    }
    data2 = JSON.parse(localStorage.getItem("messages"));
      data2.push(myobjects)
      localStorage.setItem("messages",JSON.stringify(data2))
}

$scope.delete = function(){
    data2 = JSON.parse(localStorage.getItem("messages"));
    for(var i =0; i<data2.length; i++){
        if($rootScope.mymessages==data2[i].message)
        {
          data2.splice(i,1)
        }
    }
    localStorage.setItem("messages",JSON.stringify(data2))
    $location.path('/messages')
}


$scope.important = function(){
   
    data2 = JSON.parse(localStorage.getItem("messages"));
    for(var i =0; i<data2.length; i++){
        if($rootScope.mymessages==data2[i].message){

           $rootScope.arr = $rootScope.mymessages 
           
           $location.path('/messages')
        }
    }

}

}]);
