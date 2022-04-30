# E-Commerce Back-End Demo

## Description
This is a small-scale demonstration of the back-end framework for an e-commerce platform. I used Express.js API routes and Sequelize to interact with a MySQL database.

There are four models in the database (Cateogry, Product, Tag, and a junction table called ProductTag) with different associatations between them. Categories and Products share a One-to-Many association, and Products and Tags have a Many-to-Many association.

I wanted to demonstrate my understanding of those associations and the details necessary to get and post data effectively (despite the complications that come with them).

There are get, post, put, and delete methods for every model besides ProductTag. I've included a demo video since it's all back end, but it shows that all of the methods work without errors.

It was great exercise in learning the importance of establishing table associations early because I had to adjust the code in the relationship between Product and Tag when I was testing my routes. Had this been a real database and not a mock one that I can re-seed whenever I want, I would have had to scrap the data. Also, it just took time to get used to Sequelize's documentation and know how to make it do what I want it to!

## Usage
If you would like to clone or fork this repo, here are a few instructions that might help get the program running seamlessly for you:

1. Install Node.js and mySQL.
2. In an integrated terminal, download the required npm packages with the command `npm i`
3. In order to connect sequelize to your mySQL database, create a .env file in the main directory with three variables:
    * DB_USER='mySQL username'
    * DB_PW='mySQL password'
    * DB_NAME=ecommerce_db
4. Create a database called "ecommerce_db" using the mySQL shell or running the schema.sql file in the db folder. *Be sure you aren't already using a database with that name becuase the schema is programmed to delete it if it already exists.*
5. Seed the database with mock data by running `node index.js` in the seeds folder.
6. Start the server in the integrated terminal with the commmand `node server.js`.
7. Use an API Client like Insomnia REST to test the API routes.

## Demo