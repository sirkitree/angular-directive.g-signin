# Angular Google Plus Sign-in Button Directive


[Homepage](https://github.com/sirkitree/angular-directive.g-signin)


A good starting place for a Google Plus sign-in button. Specify your client id and you're done. Well, almost. You'll also want a `signinCallback()` function so you can do something once your users are authenticated.

## Usage
1. Include `google-plus-signin.js`.
2. Add `directive.g+signin` as a dependency to your app.
3. Add `<g+signin clientid="your-client-id">` to your app.
4. Create a `signinCallback()` function to detect when your users are authenticated.

<!-- uncomment once available
## Bower
Installable via `bower`:

```bash
bower install angular-directive.g+signin
```
-->

## Example
 
See the [homepage](https://github.com/sirkitree/angular-directive.g-signin) for an example. 

```html
<div ng-app="directive.g+signin">
  <g+signin clientid="620125449078"></g+signin>
  <p>^ This is a Google Plus sign-in button</p>
</div>
```

###Handling Signin Call Back From Google Plus
You can inject $rootScope in your controllers or .run block and
Catch 'event:google-plus-signin-success' and
'event:google-plus-signin-error' events and handle them approcriately.

```javascript
  $rootScope.$on('event:google-plus-signin-success',function(event,authResult){
    //Send Login to server or save into cookie 
  });
   $rootScope.$on('event:google-plus-signin-failure',function(event,authResult){
    //Auth Failure Logic
  });
```


## License
♡ CopyHeart 2013 by [Jerad Bitner](http://jeradbitner.com) | Copying is an act of love. Please copy.
