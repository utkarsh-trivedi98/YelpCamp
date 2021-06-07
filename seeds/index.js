const Campground = require('../models/campground');
const cities = require('./cities');
const { firstName, lastName } = require('./seed-helpers');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection is open');
    })
    .catch((err) => {
        console.log(`Error in Database connection ${err}`);
    });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const price = ((Math.random() * 700) + 300).toFixed(1);
        const random283 = Math.floor(Math.random() * 282);
        const camp = new Campground({
            author: '60b825a66e5c071ff0ff4e16',
            title: `${sample(firstName)} ${sample(lastName)}`,
            location: `${cities[random283].city}, ${cities[random283].state} -${cities[random283].iso}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random283].long,
                    cities[random283].lat,
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/yelpcampgrounds/image/upload/v1623028114/YelpCamp/otu9hptwt4gthlcnouhn.jpg',
                    filename: 'YelpCamp/otu9hptwt4gthlcnouhn'
                },
                {
                    url: 'https://res.cloudinary.com/yelpcampgrounds/image/upload/v1623028114/YelpCamp/w7kgcyrflkunr6fbl41g.jpg',
                    filename: 'YelpCamp/w7kgcyrflkunr6fbl41g'
                },
                {
                    url: 'https://res.cloudinary.com/yelpcampgrounds/image/upload/v1623028114/YelpCamp/s6fm37aicwo88ptk55fd.jpg',
                    filename: 'YelpCamp/s6fm37aicwo88ptk55fd'
                }
            ],
            price: price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt laborum quas, explicabo laudantium, harum at vitae quibusdam',
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

