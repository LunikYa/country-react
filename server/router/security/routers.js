const Router = require('koa-router');
const router = Router();
const { getCountries, getFiltredCountries, getCities, getFiltredCities, verifyToken} = require('./dataModel');

router.use(['/countries', '/cities', '/countries/filtred/:val', '/cities/filtred/:val'], verifyToken)

router.get('/countries', getCountries);
router.get('/countries/filtred/:val', getFiltredCountries);
router.get('/cities/:country', getCities);
router.get('/cities/filtred/:val', getFiltredCities);

module.exports = router;