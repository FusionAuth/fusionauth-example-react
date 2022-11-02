# How to auth using {THING} and FusionAuth

{THING} is a popular tool for.... And it often happens that we need to protect certain pages/screens/APIs against access by people we don't know, or only by people we have verified are who they say they are. That means we need to authenticate them before we can determine if they are authorized to be able to access the page/screen/API in question. One way to do that without adding to the developer burden is to use an external auth provider like FusionAuth.

In this blog post, we are going to examine how to use {THING} to authenticate with FusionAuth and gain access to protected resources. This means configuring the system to protect a particular resource against casual (unauthenticated) access, as well as writing code demonstrating how to close down an authenticated session (that is to say, log out).

## How it works: The basics of OAuth2 and OpenId Connect

## Getting FusionAuth

## Configuring FusionAuth

## Building the app
{THING-specific prose here}

### Configuring code to use the FusionAuth settings

### Configuring code to protect the protected resource

### Signing on

### Signing out

## Wrapping up
