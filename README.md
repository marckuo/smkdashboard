# smkdashboard
SMK Dashboard

[![Check out the website!](http://www.coolblackattire.com/wp-content/uploads/2015/08/check-it-out-button-300x71.png  
)](https://www.youtube.com/watch?v=Ia3EEDfclbI)

clone repository
cd into the main folder

install npm modules
  $npm install

if you have a postgres server, run
  $createdb final
  
if you do not have postgres installed, install it at http://postgresapp.com/

create the tables in the database (if you named your database something other than 'final',
you'll need to change the db name in models/database.js)

  $node_modules/.bin/sequelize db:migrate

after this, you should be able to make API requests to localhost:4000 using the following routes - https://docs.google.com/document/d/1NpWjcd2uCN9cGhJilakZdoVGKM_Nc4N6Uy9IVqDvvjw/edit?usp=sharing

If you would like to look at the sound visualization, run localhost:4000/test in a separate window from localhost:4000 - you should be able to see the p5 frequency visualization on the front page.  
