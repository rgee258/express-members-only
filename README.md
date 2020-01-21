# Members Only

In this repository you'll find a small app exclusive to members only!... Or not really. Here is a simple app where you can sign up to add messages to the club. However only members, which are users that have entered a super secret membership code, are able to see who wrote what message and when they did so.

You can try it on Heroku [here]().

The membership code if you want to try is on Heroku is: *newmember*.

This project is done following The Odin Project, which can
be found [here](https://www.theodinproject.com/courses/nodejs/lessons/members-only).

## Setup

To run the application, first install the dependencies using **npm install**.

Create a .env to setup the environment variables needed for database access and setting your own password for DELETE actions. These variables are as follows:

- MONGODB_URI (URI for accessing the Mongo DB)
- MEMBERSHIP_CODE (Code for registering users as members)
- ADMIN_CODE (Code for granting admin permissions during sign up)

Then use **npm start** to start the application.

## Usage

The different user types have a number of usage capabilities for this app that are as follows:

**Guests**
- View all messages
- Sign up for a user account

**Users**
- View all messages
- Create messages
- Submit membership code

**Members**
- View all messages
- View all message details
- Create messages

**Admins**
- View all messages
- View all message details
- Create messages
- Delete messages

### Walkthrough

The basic walkthrough for the usage of this app is to first sign up for a user account. Note the username (which uses your email) and password to make sure you can log in.

If you have the admin code, you can input it during sign up to be granted admin privileges along with automatically gaining membership status.

If you have the membership code, then after your initial sign up or any future logins you can input it and have your account elevated to member status. With this you can view the author and date details of each message.

No matter what level of user you are, as long as you have a properly created user account you can submit messages, so have fun with the club!

## Useful References

- Using .bail to prevent duplicate validation errors: https://stackoverflow.com/questions/58069250/express-validator-returns-validation-errors-twice
- Explanation of what .exec does: https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do/41148831#41148831
- Using partials with EJS: https://medium.com/@henslejoseph/ejs-partials-f6f102cb7433
