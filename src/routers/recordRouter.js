const express = require("express");
const { getRecords, addRecord } = require("../controllers/recordController");

// Create the router for records collection
const router = new express.Router();

// Endpoint to get all records from database
router.post("/records", getRecords);
// router.post("/records", addRecord);

module.exports = router;
