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
        
        // Some default values, based on prior versions of this directive
        var options = {
          callback: 'signinCallback',
          class: 'g-signin',
          clientid: attrs.clientid + '.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          requestvisibleactions: 'http://schemas.google.com/AddActivity',
          scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
          width: 'wide'
        };

        // These are the attribute names supported by the Google+ Login API
        var attrNames = ['class', 'cookiepolicy', 'accesstype', 'apppackagename',
            'approvalprompt', 'callback', 'height', 'redirecturi', 'requestvisibleactions', 'scope',
            'theme', 'width'
        ];

        // Override defaults with values provided via attribute declarations
        angular.forEach(attrNames, function(elt) {
          if (attrs.hasOwnProperty(elt)) {
            options[elt] = attrs[elt];
          } else if (attrs.hasOwnProperty('data-' + elt)) {
            // If the attrs already has the data-* property, we don't need anything
            delete options[elt];
          }
        });

        // Set the class on the element.  This has to be special cased, since it's a real HTML attribute.
        attrs.$set('class', options.class);
        delete options.class;

        // Set the data-* attributes on the element, based on the defaults and information provided by
        angular.forEach(Object.getOwnPropertyNames(options), function(elt) {
          attrs.$set('data-' + elt, options[elt]);
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
