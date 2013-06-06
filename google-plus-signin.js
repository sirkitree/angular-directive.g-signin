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
        
        // Set the class on the element.  This has to be special cased, since it's a real HTML attribute.
        attrs.$set('class', 'g-signin');

        attrs.$set('data-clientid', attrs.clientid + '.apps.googleusercontent.com');
        delete attrs.clientid; // Avoid duplication and potential confusion

        // Some default values, based on prior versions of this directive
        var options = {
          callback: 'signinCallback',
          cookiepolicy: 'single_host_origin',
          requestvisibleactions: 'http://schemas.google.com/AddActivity',
          scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
          width: 'wide'
        };

        // Set the data-* attributes on the element, based on the defaults and information provided by
        angular.forEach(Object.getOwnPropertyNames(options), function(elt) {
          if (!(attrs.hasOwnProperty(elt) || attrs.hasOwnProperty('data-' + elt))) {
            attrs.$set('data-' + elt, options[elt]);
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
