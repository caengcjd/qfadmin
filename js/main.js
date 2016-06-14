var myApp = angular.module('myApp', ['ng-admin','ngDialog','base64','ngMessages']);


var API='http://test.api.qfplan.com/';//admin/access/login.json;

myApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function(nga, fvp) {
    nga.registerFieldType('amount', require('./types/AmountField'));
    fvp.registerFieldView('amount', require('./types/AmountFieldView'));
}]);


var apiFlavor = require('./api_flavor');
//myApp.run(['Restangular','$rootScope', apiFlavor.requestInterceptor]);
//myApp.run(['Restangular', apiFlavor.responseInterceptor]);

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    var admin = nga.application('My First Admin')
      .baseApiUrl(API); // main API endpoint
    admin.addEntity(nga.entity('customers'));
    admin.addEntity(nga.entity('categories'));
    admin.addEntity(nga.entity('products'));
    admin.addEntity(nga.entity('reviews'));
    admin.addEntity(nga.entity('commands'));
    admin.addEntity(nga.entity('settings'));
    // configure entities
    require('./customers/config')(nga, admin);
    require('./categories/config')(nga, admin);
    require('./products/config')(nga, admin);
    require('./reviews/config')(nga, admin);
    require('./commands/config')(nga, admin);
    require('./settings/config')(nga, admin);
    admin.dashboard(require('./dashboard/config')(nga, admin));
    admin.header(require('./header.html'));
    admin.menu(require('./menu')(nga, admin));
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

myApp.directive('approveReview', require('./reviews/approveReview'));
myApp.directive('batchApprove', require('./reviews/batchApprove'));
myApp.directive('starRating', require('./reviews/starRating'));
myApp.directive('basket', require('./commands/basket'));
myApp.directive('dashboardSummary', require('./dashboard/dashboardSummary'));
myApp.directive('zoomInModal', require('./products/zoomInModal'));
myApp.directive('showImage', [function() {
  return {
    restrict: 'A',
    scope: {
      url: '='
    },
    link: function (scope, element, attrs) {
      var img = new Image();
      var imgSrc = scope.url;
      img.src = imgSrc;
      $(element).append(img);
    }
  }
}]);
// custom controllers

myApp.config(['$stateProvider', require('./segments/segmentsState')]);
myApp.service('Session', function () {
  this.create = function (area_id,email,gender,id,name,status,telephone) {
    this.area_id=area_id;
    this.email=email;
    this.gender=gender;
    this.id = id;
    this.name= name;
    this.status = status;
    this.telephone=telephone;
  };
  this.get=function(attr){
    if(this.attr)return this.attr;
  }
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
   // this=null;
  };
  return this;
});

myApp.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('posters_galore_login');
}]);
myApp.controller('LoginController', function ($scope,$base64, $rootScope,$http,AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    account: '',
    password: '',
    verify:''
  };
  $scope.createUUID = (function (uuidRegEx, uuidReplacer) {  
        return function () {  
            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();  
        };  
    })(/[xy]/g, function (c) {  
        var r = Math.random() * 16 | 0,  
            v = c == "x" ? r : (r & 3 | 8);  
        return v.toString(16);  
    });  
   $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      window.localStorage.setItem('posters_galore_login',user.data.data.name);
      window.localStorage.setItem('TOKEN',$rootScope.token);
      window.location.href = "./index.html";
      //$scope.setCurrentUser(user);//
    }, function (user) {
      console.log(user);
      if(user.data.Code==2000){
        $scope.errorName=user.data.info || user.data.Msg;
        console.log($scope.errorName);
       }
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      //console.log('loginFailed!');
    });
  };
$scope.getVerifyCode = function () {
        return $http
         ({method:'get',
          url: 'http://test.api.qfplan.com/Admin/login/verify.png?'+Math.random()//,
         // headers:{'TOKEN':$scope. createUUID()}
         }).success(function (data, status, headers, config) {
         $scope.imgSrc=data;
          $rootScope.token=headers('token');
        }).error(function(data, status, headers, config) {
          $scope.imgSrc=data.data;
          $rootScope.token=headers('token');
            console.log('global:'+$rootScope.token);
         // console.log(headers('token'));
      });
  };
});//controller
myApp.factory('AuthService', function ($rootScope,$http, Session) {
  var authService = {};
  authService.login = function (credentials) {
    console.log('request:'+$rootScope.token);
      //console.log('hehe'+credentials);
    return $http({
     method:'post',  
     url:API+'Admin/login.json',  
     headers:{'TOKEN':$rootScope.token,
     'Content-Type': 'application/x-www-form-urlencoded'},  
     transformRequest: function(obj) {  
     var str = [];  
     for(var p in obj){  
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
     }  
     return str.join("&");  
    } ,
     data: {account:credentials.account,
                password:credentials.password,
                verify:credentials.verify}
 }).success(function (data, status, headers, config) {
        $rootScope.token=headers('token');
        myApp.value('TOKEN',headers('token'));
        Session.create(data.data.area_id,data.data.email,data.data.gender,data.data.id,data.data.name,data.data.status,data.data.telephone);
        return  data.data;
      }).error(function(data,status,headers,config){
         // console.log(data);
          return data;

      });
  };
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
  return authService;
});
/*
 myApp.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addElementTransformer('commands', function(element) {
      console.log(element);
        for (var key in element.data.list) {
            element[key] = element.data.list[key];
        }

        return element;
    });
}]);


*/
myApp.run(['Restangular','$window','ngDialog',function (Restangular,$window,ngDialog) {
    Restangular.addElementTransformer('commands', function(element) {
        return element;
    });
    Restangular.addResponseInterceptor(function(data, operation, what, url, response) {

       console.log(what,operation,data);
       console.log(data.Code,data.Msg);
       if(data.Code=='2002'){
         ngDialog.open({
           template: '<p>TOKEN  expired,Please  login</p>',
           plain: true
          });
            window.localStorage.removeItem('posters_galore_login');
            window.location.href = "./login.html";
       }
       if(operation=='get' && (what=='commands'||what=='categories')){

        return  data.data;
       }
       if(operation=='getList' &&what=='commands'){

        return  data.data.list;
       }
       if(operation=='getList' &&(what=='categories'||what=='products')){

        return  data.data;
       }
        if (operation == "getList") {
            var contentRange = response.headers('Content-Range');
            response.totalCount = contentRange.split('/')[1];
        }
        return data;
    });
   Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
         var token =$window.localStorage.getItem('TOKEN') || null;
         if(!token || token=='undefined'){    window.location.href = "./login.html";}
      //console.log('heheda'+$rootScope.token);
        headers['TOKEN']= token;
        if (operation == "getList") {
            // custom pagination params
            if (params._page) {
                params._start = (params._page - 1) * params._perPage;
                params._end = params._page * params._perPage;
            }
            delete params._page;
            delete params._perPage;
            // custom sort params
            if (params._sortField) {
                params._sort = params._sortField;
                params._order = params._sortDir;
                delete params._sortField;
                delete params._sortDir;
            }
            // custom filters
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: params };
    });

}]);