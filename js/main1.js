// require('ng-admin'); removed here and added back as a <script> tag to hep debugging - WebPack doesn't properly handle sourcemaps of dependencies yet
require('./api');

var myApp = angular.module('myApp', ['ng-admin']);

// custom API flavor
var apiFlavor = require('./api_flavor');
var API='http://test.api.qfplan.com/';//admin/access/login.json;
//initlizase
myApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);
myApp.config(['RestangularProvider', apiFlavor.responseInterceptor]);
//myApp.config(['RestangularProvider', apiFlavor.baseUrl]);
/* custom 'amount' type
myApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function(nga, fvp) {
    nga.registerFieldType('amount', require('./types/AmountField'));
    fvp.registerFieldView('amount', require('./types/AmountFieldView'));
}]);
*/  
// custom 'amount' type
myApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function(nga, fvp) {
    nga.registerFieldType('amount', require('./types/AmountField'));
    fvp.registerFieldView('amount', require('./types/AmountFieldView'));
}]);

// custom directives

// custom states (pages)

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create the admin application
    var admin = nga.application('My First Admin')
        .baseApiUrl('http://qfplan.com/');
    // add entities
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

// custom directives
myApp.directive('approveReview', require('./reviews/approveReview'));
myApp.directive('batchApprove', require('./reviews/batchApprove'));
myApp.directive('starRating', require('./reviews/starRating'));
myApp.directive('basket', require('./commands/basket'));
myApp.directive('dashboardSummary', require('./dashboard/dashboardSummary'));
myApp.directive('zoomInModal', require('./products/zoomInModal'));
// custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('posters_galore_login');
}]);
// custom states (pages)

myApp.config(['$stateProvider', require('./segments/segmentsState')]);
myApp.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
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

myApp.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    account: '',
    password: '',
    verify:''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      console.log('loginFailed!');
    });
  };
});

myApp.factory('AuthService', function ($http, Session) {
  var authService = {};
  authService.login = function (credentials) {
      console.log('hehe'+credentials);
    return $http
      .post(API+'admin/access/login.json', credentials)
      .then(function (res) {
        console.log('res'+res);
        Session.create(res.datamake.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
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





