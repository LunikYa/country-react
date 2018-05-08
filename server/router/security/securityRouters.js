const Router = require('koa-router');
const router = Router();
const { getCountries, getFiltredCountries, getCities, filtredCities } = require('./dataController');

router.get('/countries', getCountries);
router.get('/countries/filtred/:val', getFiltredCountries);
router.get('/cities/:countryId', getCities);
router.get('/cities/filtred/:val', filtredCities);

module.exports = router;