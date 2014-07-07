/* global angular: true, window: true, document: true */

'use strict';

/*
 * angular-google-plus-directive v0.0.1
 * ♡ CopyHeart 2013 by Jerad Bitner http://jeradbitner.com
 * Copying is an act of love. Please copy.
 */

angular.module('directive.g+signin', []).
  directive('googlePlusSignin', function () {
  var ending = /\.apps\.googleusercontent\.com$/;

  return {
    restrict: 'E',
    template: '<span class="g-signin"></span>',
    replace: true,
    link: function (scope, element, attrs) {
      attrs.clientid += (ending.test(attrs.clientid) ? '' : '.apps.googleusercontent.com');

      attrs.$set('data-clientid', attrs.clientid);

      // If offline access is needed, add that in if the attribute is set
      if ('offlineaccess' in attrs) {
        attrs.$set('data-accesstype', 'offline');
      }

      var scopes = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email';

      if ('addscope' in attrs) {
        scopes = scopes + ' ' + attrs.addscope;
      }

      // Some default values, based on prior versions of this directive
      var defaults = {
        callback: 'signinCallback',
        cookiepolicy: 'single_host_origin',
        requestvisibleactions: 'http://schemas.google.com/AddActivity',
        scope: scopes,
        width: 'wide'
      };

      // Provide default values if not explicitly set
      angular.forEach(Object.getOwnPropertyNames(defaults), function(propName) {
        if (!attrs.hasOwnProperty(propName)) {
          attrs.$set('data-' + propName, defaults[propName]);
        }
      });

      // Default language
      // Supported languages: https://developers.google.com/+/web/api/supported-languages
      attrs.$observe('language', function(value){
        window.___gcfg = {
          lang: value ? value : 'en'
        };
      });   

      // Asynchronously load the G+ SDK.
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }
  };
}).run(['$window','$rootScope',function($window, $rootScope) {
  $window.signinCallback = function (authResult) {
    if (authResult && authResult.access_token){
      $rootScope.$broadcast('event:google-plus-signin-success', authResult);
    } else {
      $rootScope.$broadcast('event:google-plus-signin-failure', authResult);
    }
  }; 
}]);


