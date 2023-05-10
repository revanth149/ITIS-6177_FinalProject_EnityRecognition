const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();


router.get('/RecognizeEntityLinking', controller.link);

router.get('/RecognizeEntities', controller.RegEntity);

router.get('/RecognizePiiEntities', controller.RegPiiEntity);

router.get('/ExtractKeyPhrase', controller.KeyPhrase);

module.exports = router;