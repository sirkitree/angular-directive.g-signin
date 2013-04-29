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
        attrs.$set('class', 'g-signin');
        // @todo: write about the signinCallback
        attrs.$set('data-callback', 'signinCallback');
        // attrs.$set('data-clientid', attrs.clientid + '.apps.googleusercontent.com');
        attrs.$set('data-cookiepolicy', 'single_host_origin');
        attrs.$set('data-requestvisibleactions', 'http://schemas.google.com/AddActivity');
        attrs.$set('data-scope', 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email');
        attrs.$set('data-width', 'wide');

        (function() {
          var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
          po.src = 'https://apis.google.com/js/client:plusone.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
      }
    };
  });
