# Exercise 5

## About the application

The task was to use Angular to connect to the shop backend which
persists different shop owners. It has the main features:  

1. Showing a Master/Detail view of shop owners
2. Updating owner names

## Guidelines for starting up the application

The backend is dockerized, so it can be started from the main folder:

`cd exercise5`

`docker-compose up --build`

This will start the backend server running mongodb and the node.js application.

Since it was not required in the scope of the app to initialize the Database we have to first create a few shop owners.

Open Postman App, and shoot a few POST-requsts to the following URL:

`POST localhost:4000/owner` with JSON body of:

`{
	"name": "Jack"
}`

of course with different names!

Verify they have been creating by shooting GET-Request at

`GET localhost:4000/owner`

Great!

Now for starting the angular frontend, open a new terminal and access the angular folder:

`cd exercise5/angular`

Start angular local server with angular-CLI:

`ng serve`

(installing dependencies might be required beforehand)

Access

`localhost:4200`

in a web browser of your choice (If this doesnt work check the port number of angular app in the terminal).

Now the created shop owners are displayed. Their names can be modified in the detail view.

Refresh the browser to make sure the updates are persisted.
