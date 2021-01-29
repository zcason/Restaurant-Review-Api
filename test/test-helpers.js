function makeRestaurantsArray() {
    return [
        {
            id: 1,
            name: 'Test Restaurant 1',
            location: 'location 1',
            price_range: 2,
        },
        {
            id: 2,
            name: 'Test Restaurant 2',
            location: 'location 2',
            price_range: 4,
        },
    ]
}


function makeReviewsArray(restaurant) {
    return [
        {
            id: 1,
            name: 'First test post!',
            content: 'Lorem ipsum dolor sit amet!',
            rating: 5,
            restaurant_id: restaurant[0].id,
        },
        {
            id: 2,
            name: 'Second test post!',
            content: 'Lorem ipsum dolor sit amet!',
            rating: 1,
            restaurant_id: restaurant[1].id
        },
    ]
}

function makeExpectedRestaurant(restaurant) {

    return {
        id: restaurant.id,
        name: restaurant.name,
        location: restaurant.location,
        price_range: restaurant.price_range,
    }
}

function makeExpectedReview(restaurants, review) {
    const restaurant_id = restaurants.find(restaurant => restaurant.id === review.restaurant_id)

    return {
        id: review.id,
        name: review.name,
        content: review.content,
        rating: review.rating,
        restaurant_id: restaurant_id
    }
}

function makeFixtures() {
    const testRestaurants = makeRestaurantsArray()
    const testReviews = makeReviewsArray(testRestaurants)
    return { testRestaurants, testReviews }
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
        reviews,
        restaurants;
      `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE reviews_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE restaurants_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('reviews_id_seq', 0)`),
                    trx.raw(`SELECT setval('restaurants_id_seq', 0)`),
                ])
            )
    )
}

function seedRestaurantsTable(db, restaurants) {
    const preppedRestaurants = restaurants.map(restaurant => ({
        ...restaurant
    }))
    return db.into('restaurants').insert(preppedRestaurants)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('restaurants_id_seq', ?)`,
                [restaurants[restaurants.length - 1].id],
            )
        )
}

function seedReviewsTable(db, restaurants, reviews) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
        await seedRestaurantsTable(trx, restaurants)
        await trx.into('reviews').insert(reviews)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('reviews_id_seq', ?)`,
            [reviews[reviews.length - 1].id],
        )
    })
}

module.exports = {
    makeRestaurantsArray,
    makeReviewsArray,
    makeExpectedRestaurant,
    makeExpectedReview,
    makeFixtures,
    cleanTables,
    seedRestaurantsTable,
    seedReviewsTable
};