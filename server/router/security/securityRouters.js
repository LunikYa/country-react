const Router = require('koa-router');
const router = Router();
const { getCountries, getFiltredCountries, getCities, getFiltredCities } = require('./dataController');

router.get('/countries', getCountries);
router.get('/countries/filtred/:val', getFiltredCountries);
router.get('/cities/:countryId', getCities);
router.get('/cities/filtred/:val/:countryId', getFiltredCities);

module.exports = router;