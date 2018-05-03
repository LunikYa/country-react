const Router = require('koa-router');
const router = Router();
const { getCountries, getFiltredCountries, getCities, getFiltredCities } = require('./dataController');

router.get('/countries', getCountries);
router.get('/countries/filtred/:val', getFiltredCountries);
router.get('/cities/:country', getCities);
router.get('/cities/filtred/:val', getFiltredCities);

module.exports = router;