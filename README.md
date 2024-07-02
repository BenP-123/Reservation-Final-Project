# Restaurant Reservation System
### Ben Pelham

Link to deployed project - https://reservation-final-project-front-end.onrender.com/

This project is the final capstone for the web development course through Chegg Skills. The prompt is as follows:

> You have been hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online.


## Project description and examples:


### Create new reservations:
![create reservation](screenshots/createReservation)

### Display reservations on the dashboard
![display reservation](screenshots/displayReservation)

### Create new tables:
![create table](screenshots/createTable)

### Display tables on the dashboard:
![display table](screenshots/displayTable)


### Edit existing reservations:
![edit reservation](screenshots/editReservation)

### Update and display edited reservations:
![update and display edited reservations](screenshots/updateAndDisplayReservation)

### Search reservation by mobile number:
![search reservation](screenshots/searchReservation)

### Assign a reservation to a table:
![assign reservation to table](screenshots/assignReservation)

### Status of seated reservations and occupied tables update as necessary:
![updated status of reservation and table](screenshots/updateStatus)



## Project endpoints

| Express endpoint                           | Functionality                                                          |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| `POST /reservations`                       | returns all reservations                                               |
| `GET /reservations`                        | creates a new reservation                                              |
| `GET /reservations?date='YYYY-MM-DD'`      | returns reservations by date                                           |
| `GET /reservations?mobile_number=123`      | returns reservations matching mobile number                            |
| `GET /reservations/:reservationId`         | returns reservation with corresponding reservation ID                  |
| `PUT /reservations/:reservationId`         | updates reservation with corresponding reservation ID                  |
| `PUT /reservations/:reservationId/status`  | updates the status of a particular reservation                         |
| `GET /tables`                              | returns all tables                                                     |
| `POST /tables`                             | creates and a new table                                                |
| `PUT /tables:table_id/seat`                | updates table status to "occupied" and reservation status to "seated"  |
| `DELETE /tables:table_id/seat`             | updates table status to "free" and reservation to "finished"           |


## Technology Used:

    Front-End: HTML, CSS, Javascript, React, Bootstrap
    Back-End: Javascript, Express, Knex, PostgreSQL database
    Deploy/Tools: GitHub, Render, DBeaver


## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your PostgreSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.