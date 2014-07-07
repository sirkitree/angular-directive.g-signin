# Angular Google Plus Sign-in Button Directive


[Homepage](https://github.com/sirkitree/angular-directive.g-signin)


A good starting place for a Google Plus sign-in button. Specify your client id and you're done. Well, almost. You'll also want to set up a listener for `event:google-plus-signin-success` so you can do something once your users are authenticated.

## Usage
1. Include `google-plus-signin.js`.
2. Add `directive.g+signin` as a dependency to your app.
3. Add `<google-plus-signin clientid="your-client-id">` to your app.
4. Create a listener on your `$scope` for `event:google-plus-signin-success` to detect when your users are authenticated.
5. *Optional:* Listen for `event:google-plus-signin-failure` to handle authentication errors and sign outs.

## Options 
1. Language ([supported languages](https://developers.google.com/+/web/api/supported-languages)):
```html
  <google-plus-signin clientid="620125449078" language="sv"></google-plus-signin>
```

2. Offline Access. Allows for the sending of a token to allow offline mode as described in [server-side flow](https://developers.google.com/+/web/signin/server-side-flow):
```html
  <google-plus-signin clientid="620125449078" offlineaccess></google-plus-signin>
```

3. Additional scopes. By default the scopes are https://www.googleapis.com/auth/plus.login and https://www.googleapis.com/auth/userinfo.email. This option will append the scopes you specify to the end of the default scopes. Separate scopes with a space:
```html
  <google-plus-signin clientid="620125449078" addscope="https://mail.google.com/"></google-plus-signin>
```

## Bower
Installable via `bower`:

```bash
bower install angular-directive.g-signin
```

## Example

See the [homepage](https://github.com/sirkitree/angular-directive.g-signin) for an example.

```html
<div ng-app="directive.g+signin">
  <google-plus-signin clientid="620125449078"></google-plus-signin>
  <p>^ This is a Google Plus sign-in button</p>
</div>
```

###Handling Signin Callback from Google Plus
You can listen for `event:google-plus-signin-success` and `event:google-plus-signin-failure` and handle them appropriately.

```javascript
  $scope.$on('event:google-plus-signin-success', function (event,authResult) {
    // Send login to server or save into cookie
  });
  $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
    // Auth failure or signout detected
  });
```

## License
♡ CopyHeart 2013 by [Jerad Bitner](http://jeradbitner.com) | Copying is an act of love. Please copy.
