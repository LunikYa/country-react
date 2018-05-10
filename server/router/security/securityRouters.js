const Router = require('koa-router');
const router = Router();
const { getCountries, getFiltredCountries, getCities, filtredCities, getCountryByCity} = require('./dataController');

router.get('/countries', getCountries);
router.get('/countries/filtred/:val', getFiltredCountries);
router.get('/country/:city', getCountryByCity)
router.get('/cities/:countryId', getCities);
router.get('/cities/filtred/:val', filtredCities);

module.exports = router;