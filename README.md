# FusionAuth Example: React

## About

This simple example app shows how you can use FusionAuth in a React app to log in, log out, and manipulate user data.

## Setup

1. Make sure you have everything you need to run this app:

	- [NodeJS](https://nodejs.org/en/download/)
	- [MySQL](https://fusionauth.io/docs/v1/tech/installation-guide/database#install-mysql) or [Postgres](https://fusionauth.io/docs/v1/tech/installation-guide/database#install-postgresql)
	- [FusionAuth](https://fusionauth.io/download)

1. Clone this repository.

	```
	git clone https://github.com/FusionAuth/fusionauth-example-react.git
	```

1. Configure your app in the FusionAuth admin panel (default [localhost:9011](localhost:9011)).

	1. Go through the setup wizard if you haven't already.
	1. Create a new FusionAuth application.
	1. Set the OAuth Redirect URI to `localhost:9000/oauth-redirect`.
	1. Copy your app's Client ID, Client Secret, Redirect URI, Application ID, and API Key into the `config.js` file in the root directory of this project.
	1. Register at least one user with your application.

1. Make sure FusionAuth is running, then install dependencies and start the app. The React app should automatically open in your browser at [localhost:8080](localhost:8080).

	```
	cd server
	npm install
	npm start
	```
	```
	cd client
	npm install
	npm start
	```

## Understanding the Example

### Structure

The app has three parts, each running on a different `localhost` port (unless you've decided to set it up otherwise):

- `localhost/8080` is your React app. It has a single route (`/`) and makes calls to the Express app.
- `localhost/9000` is your Express app. It has several routes (like `/login` and `/logout`), which are used by the React app. The Express app makes calls to FusionAuth.
- `localhost/9011` is your instance of FusionAuth. It has several endpoints (like `/authorize` and `/introspect`). It accepts calls from the Express app and sends back information, such as access tokens and user registration data.

So, the parts connect like this:

`8080 <-> 9000 <-> 9011`

The React app never talks directly to FusionAuth. This is important, because the React app can be easily picked apart by anyone online, which means you can't keep confidential information there. While some calls directly to FusionAuth are safe, best practice is to keep things separated like this.

### Logging In/Out

When the user clicks on `sign in`, the React app redirects to the Express server's `/login` route, which redirects to FusionAuth's `authorize` endpoint. FusionAuth renders the username/password form, authenticates the user, and redirects to the configured Redirect URI (`/oauth-redirect` on the Express server) with an Authorization Code.

The Express server sends the Authorization Code (as well as its Client ID and Secret) to FusionAuth's `/token` endpoint. FusionAuth validates everything and sends back an Access Token. The Express Server saves this token in session storage and redirects back to the React client.

When the user clicks on `sign out`, the React app sends a request to the Express server's `/logout` route, which sends a request to FusionAuth's `/logout` endpoint, deletes the relevant cookie, and deletes the Access Token from session storage.

**The presence of the Access Token in session storage is what defines whether or not a user is logged in**, because FusionAuth will not allow retrieval or modification of user data without a valid Access Token.

### Rendering the React App

When the React client mounts, it sends a request to the Express server's `/user` route. If there's an Access Token in session storage, the Express server uses FusionAuth's `/introspect` and `/registration` endpoints to get data for the current user; these give us the `token` and `registration` JSON objects seen in the example app.

If there is no Access Token (or if it's expired), `/user` will instead return an empty object. The React components use the existence of `token` (or lack thereof) to determine whether to render the page in its logged-in or logged-out state.

### Editing User Data

All of your FusionAuth users have a `registration.data` object for storing arbitrary data related to the user. The example app allows logged-in users to modify `registration.data.userData` by changing its value in the `<textarea>`, but all `registration` information is able to be set in this way.

When the `<textarea>` is changed, the React client makes a request to the Express server's `/set-user-data` route, which makes a request to FusionAuth's `/registration` endpoint. This also executes `setState()` in the React client

## Using This Example as a Starting Point

TODO

## Contributing

TODO
