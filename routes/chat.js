const { Router } = require("express");
const { getChat, postChat } = require("../controllers/chat.js");

router = Router();

router.get("/", getChat);
router.post("/message", postChat);

module.exports = router;
