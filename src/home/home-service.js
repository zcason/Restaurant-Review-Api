const xss = require('xss');

const HomeService = {
    getAllRestaurants(db) {
        return db('restaurants')
            .select('*')
    },
    getRestaurantById(db, id) {
        return db('restaurants')
            .select('*')
            .where({ 'id': id })
    },
    getRestaurantReviews(db, id) {
        return db('reviews')
            .select('*')
            .where({ 'restaurant_id': id })
    },
    postNewRestaurant(db, newRestaurant) {
        return db
            .insert(newRestaurant)
            .into('restaurants')
            .returning('*')
            .then(([restaurant]) => restaurant)
    },
    postNewReview(db, review) {
        return db
            .insert(review)
            .into('reviews')
            .returning('*')
            .then(([review]) => review)
    },
    updateRestaurant(db, id, restaurant) {
        return db('restaurants')
            .where({ 'id': id })
            .update({
                'name': restaurant.name,
                'location': restaurant.location,
                'price_range': restaurant.price_range
            })
            .returning('*')
            .then(([restaurant]) => restaurant)
    },
    deleteRestaurant(db, id) {
        return db('restaurants')
            .where({ 'id': id })
            .delete()
    },
    serializeRestaurant(restaurant) {
        return {
            id: restaurant.id,
            name: xss(restaurant.name),
            location: xss(restaurant.location),
            price_range: xss(restaurant.price_range)
        }
    },
    serializeReview(review) {
        return {
            id: review.id,
            name: xss(review.name),
            content: xss(review.content),
            rating: xss(review.rating),
            restaurant_id: review.restaurant_id
        }
    }
}

module.exports = HomeService;