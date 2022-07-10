import { Router } from 'express';

const router = Router();

import * as ApiController from '@controllers/apiController';

router.get('/ping', ApiController.ping);

router.post('/phrases', ApiController.createPhrase);

router.get('/phrases', ApiController.getPhrases);

router.get('/phrase/random', ApiController.randomPhrase);

router.get('/phrase/:id', ApiController.getPhrase);

router.put('/phrase/:id', ApiController.updatePhrase);

router.delete('/phrase/:id', ApiController.deletePhrase);

export default router;
