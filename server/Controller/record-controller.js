const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../Middleware/authorization")
const { getRecords, getRecord, newRecord, updateRecord, deleteRecord } = require("../Services/record-services")

router.get("/", getRecords)

router.get("/:id", getRecord)

router.post("/:productId", isLoggedIn, newRecord)

router.put("/:id", isLoggedIn, updateRecord)

router.delete("/:id", isLoggedIn, deleteRecord)

module.exports = router;