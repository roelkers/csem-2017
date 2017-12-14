# Exercise 5

Submission deadline: 20.12.2018, end of day

## Self-study tutorials

Learn basic TypeScript syntax https://www.typescriptlang.org/docs/home.html

Learn how to use Angular by doing the "Tour of Heroes" tutorial: https://angular.io/tutorial

## Create an Angular app

Your task is to use Angular to implement parts of the shop app front-end which supports the following main features:

1. Showing a Master/Detail view of shop owners
2. Updating owner names

For feature 2, you need to add an update method to your back-end application (for one of the two databases).

The front-end connects to the back-end which we built in the last exercise. Updates must be persisted in the database.

### Getting started

- To get started, you might do the "Tour of Heroes" tutorial and simply exchange "hero" with "owner".

- In part 8 of the tutorial (HTTP), instead of using an in-memory database, connect your http client with the database-backed NodeJS/Express application from our previous exercise which you can provision with Docker.

- Fill the database with "owners" by firing POST requests with Postman.

### Not within the scope of this exercise

The following is out of scope:

- You only need to connect it to either the Postgres-based OR the MongoDB-based back-end (it is not required to support both!).
- You do not need to implement the Shop and Product features.
- You only need to implement a front-end which connects to the `GET /owner/:id`, `GET /owner`, and `PUT /owner` API operations. Other CRUD operations (such as create and delete) are not required for this exercise.
