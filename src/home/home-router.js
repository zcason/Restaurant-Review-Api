const express = require('express');
const HomeService = require('./home-service');


const homeRouter = express.Router();
const jsonBodyParser = express.json();

homeRouter
    .get('/', async (req, res, next) => {
        try {
            const restaurants = await HomeService.getAllRestaurants(req.app.get('db'));
            res.json(restaurants)
            next()
        } catch (error) {
            next(error)
        }
    })

homeRouter
    .get('/:restaurantId', async (req, res, next) => {
        try {
            const restaurant = await HomeService.getRestaurantById(req.app.get('db'), req.params.restaurantId);
            res.json(restaurant)
            next()
        } catch (error) {
            next(error)
        }
    })

homeRouter
    .post('/', jsonBodyParser, async (req, res, next) => {
        const { name, location, price_range } = req.body;
        const newRestaurant = {
            name,
            location,
            price_range
        }

        for (const field of ['name', 'location', 'price_range'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })

        try {
            const restaurant = await HomeService.postNewRestaurant(req.app.get('db'), newRestaurant);
            res
                .status(201)
                .json(HomeService.serializeRestaurant(restaurant))

        } catch (error) {
            next(error)
        }
    })

homeRouter
    .put('/:restaurantId', jsonBodyParser, async (req, res, next) => {
        const { name, location, price_range } = req.body;
        const restaurant = { name, location, price_range };

        try {
            const updateRestaurant = await HomeService.updateRestaurant(
                req.app.get('db'),
                req.params.restaurantId,
                restaurant
            )
            res
                .status(200)
                .json(HomeService.serializeRestaurant(updateRestaurant))

            res.status(200)
        } catch (error) {
            next(error)
        }
    })

homeRouter
    .delete('/:restaurantId', async (req, res, next) => {
        try {
            const deleteRestaurant = await HomeService.deleteRestaurant(
                req.app.get('db'),
                req.params.restaurantId
            )
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    })



module.exports = homeRouter;