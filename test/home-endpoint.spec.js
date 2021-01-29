const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('Home Endpoints', function () {
    let db

    const {
        testRestaurants,
        testReviews
    } = helpers.makeFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    // Get Request Tests
    describe(`GET /api/restaurants/`, () => {
        context(`Given no restaurants`, () => {
            it(`responds with 200 and []`, () => {
                return supertest(app)
                    .get('/api/restaurants/')
                    .expect(200, [])
            })
        })

        context(`Given there are restaurants`, () => {
            beforeEach('insert restaurants', () =>
                helpers.seedRestaurantsTable(
                    db,
                    testRestaurants
                )
            )


            it(`responds with 200 and list of restaurants`, () => {
                return supertest(app)
                    .get('/api/restaurants/')
                    .expect(200, [
                        {
                            id: 1,
                            name: 'Test Restaurant 1',
                            location: 'location 1',
                            price_range: 2,
                            restaurant_id: null,
                            count: null,
                            average_rating: null
                        },
                        {
                            id: 2,
                            name: 'Test Restaurant 2',
                            location: 'location 2',
                            price_range: 4,
                            restaurant_id: null,
                            count: null,
                            average_rating: null
                        },
                    ])
            })
        })
    })

    describe(`GET /api/restaurants/:id`, () => {
        context(`Given there are events but no reviews`, () => {
            beforeEach('insert events', () =>
                helpers.seedRestaurantsTable(
                    db,
                    testRestaurants
                )
            )

            it(`responds with 200, the specific restaurant, and no reviews`, () => {
                return supertest(app)
                    .get('/api/restaurants/1')
                    .expect(200, [
                        {
                            id: 1,
                            name: 'Test Restaurant 1',
                            location: 'location 1',
                            price_range: 2,
                            restaurant_id: null,
                            count: null,
                            average_rating: null
                        },
                        []
                    ])
            })
        })

        context(`Given there are events and reviews`, () => {
            beforeEach('insert events', () =>
                helpers.seedReviewsTable(
                    db,
                    testRestaurants,
                    testReviews
                )
            )

            it(`responds with 200, the specific restaurant, and all reviews`, () => {
                return supertest(app)
                    .get('/api/restaurants/1')
                    .expect(200, [
                        {
                            id: 1,
                            name: 'Test Restaurant 1',
                            location: 'location 1',
                            price_range: 2,
                            restaurant_id: 1,
                            count: '1',
                            average_rating: '5.0'
                        },
                        [
                            {
                                id: 1,
                                name: 'First test post!',
                                content: 'Lorem ipsum dolor sit amet!',
                                rating: 5,
                                restaurant_id: 1
                            }
                        ]
                    ])
            })
        })
    })

    // Post Request Tests 
    describe(`POST /api/restaurants`, () => {
        context(`Given the information is correct`, () => {
            it(`responds with 201 and creates the Restaurant`, () => {
                const newRestaurant = {
                    name: 'Test Restaurant 3',
                    location: 'location 1',
                    price_range: 2,
                }

                return supertest(app)
                    .post('/api/restaurants/')
                    .send(newRestaurant)
                    .expect(201)
            })
        })
    })

    describe(`POST /api/restaurants/:id`, () => {
        context(`Given the information is correct`, () => {
            beforeEach('insert events', () =>
                helpers.seedReviewsTable(
                    db,
                    testRestaurants,
                    testReviews
                )
            )

            it(`responds with 201 and creates the review`, () => {
                const newReview = {
                    name: 'Third test post!',
                    content: 'Lorem ipsum dolor sit amet!',
                    rating: 2,
                    restaurant_id: 1,
                }

                return supertest(app)
                    .post('/api/restaurants/1')
                    .send(newReview)
                    .expect(201)
            })
        })
    })

    // Put Request Test
    describe(`PUT /api/restaurants/:id`, () => {
        context(`Given the information is correct`, () => {
            beforeEach('insert events', () =>
                helpers.seedRestaurantsTable(
                    db,
                    testRestaurants
                )
            )

            it(`responds with 200 and updates restaurant`, () => {
                const updateRestaurant = {
                    name: "In and Out Burger",
                    location: "Los Angles",
                    price_range: "2"
                }

                return supertest(app)
                    .put('/api/restaurants/1')
                    .send(updateRestaurant)
                    .expect(200)
            })
        })
    })

    // Delete Request Test
    describe(`DELETE /api/restaurants/:id`, () => {
        context(`Given there are events`, () => {
            beforeEach('insert events', () =>
                helpers.seedRestaurantsTable(
                    db,
                    testRestaurants
                )
            )

            it(`responds with 204 and deletes the specific event`, () => {
                return supertest(app)
                    .delete('/api/restaurants/1')
                    .expect(204)
            })
        })
    })
})