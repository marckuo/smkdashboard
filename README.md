# smkdashboard
SMK Dashboard

clone repository
cd into the main folder

install npm modules
  $npm install

if you have a postgres server, run
  $createdb final
  
if you do not have postgres installed, install it at http://postgresapp.com/

create the tables in the database (if you named your database something other than 'final',
you'll need to change the db name in models/database.js)

  $node models/database.js
