## Getting Started

This guide is for setting up byob on your local machine.

### Dependencies

* Node.js ^10.0.0
* PostgreSQL database
* NPM packages (see package.json file)
* Nodemon

### Clone the repo

If you want to contribute to the project, I would fork the repo and then clone it down onto your machine locally.

    git clone https://github.com/kmiller9393/byob/

Change into the directory:

    cd byob

Add an `upstream` remote that points to the main repo:

    git remote add -u https://github.com/kmiller9393/byob/

Run the following command:

    npm install

### Set it up

Set up psql with the databases used in the project. Do this in your terminal.

```sh
$ psql 
$ CREATE DATABASE job_board;
$ CREATE DATABASE job_board_test;
```
Run the migration and seed for the database.

```sh
$ knex migrate:latest
$ knex seed:run
```

To start the server
`node server.js` from the root directory.

Your server should now be running on http://localhost:3010

### Testing 

To run the test suite enter:

    $ npm test
    
