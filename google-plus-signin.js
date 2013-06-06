'use strict';

/*
 * angular-google-plus-directive v0.0.1
 * ♡ CopyHeart 2013 by Jerad Bitner http://jeradbitner.com
 * Copying is an act of love. Please copy.
 */

angular.module('directive.g+signin', []).
  directive('g+signin', function () {
    return {
      restrict: 'E',
      template: '<span></span>',
      replace: true,
      link: function (scope, element, attrs) {
        
        // Set class.
        attrs.$set('class', 'g-signin');

        attrs.$set('data-clientid', attrs.clientid + '.apps.googleusercontent.com');

        // Some default values, based on prior versions of this directive
        var defaults = {
          callback: 'signinCallback',
          cookiepolicy: 'single_host_origin',
          requestvisibleactions: 'http://schemas.google.com/AddActivity',
          scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
          width: 'wide'
        };

        // Provide default values if not explicitly set
        angular.forEach(Object.getOwnPropertyNames(defaults), function(propName) {
          if (!attrs.hasOwnProperty('data-' + propName)) {
            attrs.$set('data-' + propName, defaults[propName]);
          }
        });

        // Asynchronously load the G+ SDK.
        (function() {
          var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
          po.src = 'https://apis.google.com/js/client:plusone.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
      }
    };
  });
