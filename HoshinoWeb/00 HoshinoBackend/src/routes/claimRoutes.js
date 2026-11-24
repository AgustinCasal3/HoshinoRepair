const express = require('express');
const router = express.Router();
const {
    getClaims,
    getClaimsByUserId,
    createClaim,
    resolveClaim
} = require('../controllers/claimController');

router.get('/', getClaims);
router.get('/user/:userId', getClaimsByUserId);
router.post('/', createClaim);
router.put('/:id/resolve', resolveClaim);

module.exports = router;