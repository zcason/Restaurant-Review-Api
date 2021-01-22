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
    postNewRestaurant(db, newRestaurant) {
        return db
            .insert(newRestaurant)
            .into('restaurants')
            .returning('*')
            .then(([restaurant]) => restaurant)
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
    }
}

module.exports = HomeService;