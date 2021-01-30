# Restaurant Review
'Restaurant Review' allows users to add restaurants to a restaurant board and also add reviews to each restaurant.



### 1. Working Prototype
You can access a working prototype of the React app here: https://restaurant-review-phi.vercel.app and Node app here: https://still-forest-75414.herokuapp.com



### 2. User Story

###### Cover Page
* As a visitor,
* I want to understand what this app entails to make a decision if I want to use it.


###### My Home Page
* As a user,
* I can see the all of the restaurants posted on the restaurant board. If I click on the restaurant's row, I will be taken to the restaurant's detail page. If I click on the update button, I will be taken to a page where I can update the selected restaurant's info. If I click on the delete button, the selected restaurant will be removed from the restaurant board.


###### Detail Page
* As a user,
* I can see all of the reviews for the selected restaurant. I am also able to create my own review for the restaurant.

###### Update Page
* As a user,
* I can update the restaurant's information like name, location, or price range with a form that contains the restaurant's pre-updated values.



### 3. Screenshots
Cover Page
:-------------------------:
![Cover Page](/screenshots/Cover-Page.png)
Restaurants Page
![Restaurants Page](/screenshots/Restaurants-Page.png)
Details Page
![Details Page](/screenshots/Details-Page.png)
Update Page
![Update Page](/screenshots/Update-Page.png) 



### 4. API Documentation
API Documentation details:
* GET All Restaurant by Month
    * `https://still-forest-75414.herokuapp.com/api/`

* GET Specific Restaurant
    * `https://still-forest-75414.herokuapp.com/api/:restaurantId`

* POST Restaurant
    * `https://still-forest-75414.herokuapp.com/api/`
        * JSON body
        *   { "name": "Shack Shake", "location": "Austin", "price_range": 3, 
            }

* POST Review
    * `https://still-forest-75414.herokuapp.com/api/:restaurantId`
        * JSON body
        *   { "name": "Zuri", "content": "Incredible Service", "rating": 5, "restaurant_id": 1
        }

* PUT Restaurant
    * `https://still-forest-75414.herokuapp.com/api/:restaurantId`
    * JSON body
        *   { "name": "Shack Shake", "location": "Atlanta", "price_range": 2, 
            }

* DELETE Restaurant
    * `https://still-forest-75414.herokuapp.com/api/:restaurantId`



### 5. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, PostgreSQL 
* Development Environment: Vercel, Heroku
 


### 6. How to run it
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate 
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test

Icons made by https://www.freepik.com 