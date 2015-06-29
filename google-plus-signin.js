'use strict';

/*
 * angular-google-plus-directive v0.0.1
 * ♡ CopyHeart 2013 by Jerad Bitner http://jeradbitner.com
 * Copying is an act of love. Please copy.
 * Modified by Boni Gopalan to include Google oAuth2 Login.
 */

angular.module('directive.g+signin', []).
  directive('googlePlusSignin', ['$window', '$rootScope', function ($window,$rootScope) {
    var ending = /\.apps\.googleusercontent\.com$/;

    return {
      restrict: 'E',
      transclude: true,
      template: '<span></span>',
      replace: true,
      link: function (scope, element, attrs, ctrl, linker) {
        attrs.clientid += (ending.test(attrs.clientid) ? '' : '.apps.googleusercontent.com');

        attrs.$set('data-clientid', attrs.clientid);

        // Some default values, based on prior versions of this directive
        function onSignIn (authResult) {
          $rootScope.$broadcast('event:google-plus-signin-success', authResult);
        }; 
        function onSignInFailure () {
          $rootScope.$broadcast('event:google-plus-signin-failure', null);
        };         
        var defaults = {
          onsuccess:onSignIn,
          cookiepolicy: 'single_host_origin',
          onfailure:onSignInFailure,
          scope: 'profile email',
          'longtitle': false,
          'theme': 'dark'          
        };

        defaults.clientid = attrs.clientid;

        // Overwrite default values if explicitly set
        angular.forEach(Object.getOwnPropertyNames(defaults), function(propName) {
          if (attrs.hasOwnProperty(propName)) {
            defaults[propName] = attrs[propName];
          }
        });

        // Default language
        // Supported languages: https://developers.google.com/+/web/api/supported-languages
        attrs.$observe('language', function(value){
          $window.___gcfg = {
            lang: value ? value : 'en'
          };
        });
        
        // Asynchronously load the G+ SDK.
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/client:platform.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

        linker(function(el, tScope){
          po.onload = function() {
            if (el.length) {
              element.append(el);
            }
            gapi.signin2.render(element[0], defaults);
          };
        });
      }
    }
}]).
run();
