# Apartment Dashboard 

This is the inital repository for the Apartment dashboard application. Some test users have been created for you to test with on a local mongodb. For my demonstration I plan on pushing all of this to heroku to be tested as well. This application features a React frontend with an express routing backend. I'm using mongoose and mongodb for my database and ORM. I'm also using JWT tokens for authentication as well as Bcrypt for password encryption. I've create my MVP for the apartment dashboard based on the requirements given. 

# Client:
## of course you can register as a client user 
username : brad@testing.com
pw: 123

# Realtor:
## of course you can register as a realtor user 
username : john.doe@realtor.com
pw: johnspassword

# Admin
## I am not allowing a creation of admin users, that has to be done manually
username: brad.ike@gmail.com
pw: 123

If you want to create your own admin user you can do so manually inside your mongoDB by simply creating a realtor and changing a column in the database called "admin" to true. You can then login and you will be granted an admin token to view the CRUD aspects of the Admin. The Admin screen has 2 extra menu items at the top of the dashboard called "Users" and "Apartments". The admin can CRUD any user and CRUD any apartment listing while the realtor can only CRUD their own listings. 



## Installation

``` bash
# clone the repo
$ git clone https://git.toptal.com/screening/bradley-eichenberg.git

# go into app's directory
$ cd bradley-eichenberg

# install app's dependencies
$ npm install
```

## Copyright and license

copyright 2020 ikeDesign.