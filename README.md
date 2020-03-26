# Apartment Dashboard 

This is a repository for test project I did over a couple days. Its a fairly standard express boilerplate servering a React app in the client folder. Its basically a simplified version of Zillow aka its an apartment dashboard application. Some test users have been created for you on npm install with a seed script. These users and apartments will be added to a local mongodb to test with. For my demonstration I plan on pushing all of this to heroku to be tested as well. This application features a React frontend with an express routing backend. I'm using mongoose and mongodb for my database and ORM. I'm also using JWT tokens for authentication as well as Bcrypt for password encryption. I've create my MVP for the apartment dashboard based on the requirements given. 

This can be viewed on heroku as well at https://toptalapartment.herokuapp.com/

# TEST USERS THAT WERE INSTALLED ON NPM INSTALL WITH SEED 
# Client:
## of course you can register as a client user 
username : henry.ford@toptal.com
pw: henry

# Realtor:
## of course you can register as a realtor user 
username : john@toptal.com
pw: john

# Admin
## I am not allowing a creation of admin users, that has to be done manually, I've added 2 admins
username: brad.ike@gmail.com
pw: BRAD

username: murillo@toptal.com
pw: murillo

If you want to create your own admin user you can do so manually inside your mongoDB by simply creating a realtor and changing a column in the database called "admin" to true. You can then login and you will be granted an admin token to view the CRUD aspects of the Admin. The Admin screen has 2 extra menu items at the top of the dashboard called "Users" and "Apartments". The admin can CRUD any user and CRUD any apartment listing while the realtor can only CRUD their own listings. 

## Google API KEYS!!!!!!!

In order for this to be a public repository and not be vulnerable to my google API key being stolen i put my API key in a .env file in the root of the CLIENT folder. Simply create your own .env file in the client folder and create this line 

REACT_APP_GOOGLE_API_KEY=yourAPIkeyGOEShere

then you can see in the code that to reference the api key you just use 
process.env.REACT_APP_GOOGLE_API_KEY. Apparently REACT has it built it so that you can access env variables when you are in DEV by putting REACT_APP_ in front of any of those variables. Who knew. 

If you want to push this to heroku or a different cloud host you need to make sure you create your environment variable when you push this live. 



## Installation

``` bash
# clone the repo
$ git clone https://git.toptal.com/screening/bradley-eichenberg.git

# go into app's directory
$ cd ApartmentApp   (or whatever you end up naming it)

# install app's dependencies
$ npm install
```

## Copyright and license

copyright 2020 ikeDesign.