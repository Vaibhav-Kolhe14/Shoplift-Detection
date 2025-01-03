const router = express.Router();
const detectedData = require('../controllers/detectionController.js')


router.route('/detectionData', detectedData)

module.exports = router