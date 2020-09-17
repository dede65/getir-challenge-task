const Record = require("../models/Record");

// Fetch all records from database
async function getRecords(req, res) {
  // Get required field from request body
  let { startDate, endDate, minCount, maxCount } = req.body;

  if (!startDate || !endDate || !minCount || !maxCount) {
    startDate = "1970-01-01";
    endDate = Date.now();
    minCount = 100;
    maxCount = 110;
  }

  try {
    const records = await Record.aggregate([
      {
        $match: {
          createdAt: {
            $lt: new Date(endDate),
            $gte: new Date(startDate),
          },
        },
      },
      { $unwind: { path: "$counts", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: { createdAt: "$createdAt" },
          key: { $first: "$key" },
          createdAt: { $first: "$createdAt" },
          totalCount: { $sum: "$counts" },
        },
      },
      {
        $match: {
          totalCount: {
            $lt: maxCount,
            $gte: minCount,
          },
        },
      },
      { $project: { _id: 0 } },
    ]);

    if (records.length === 0) {
      return res.status(420).send({ code: 1, msg: "Record(s) not found." });
    }

    res.status(200).send({ code: 0, msg: "Success", records });
  } catch (error) {
    res.status(420).send({ code: -1, msg: "Error", error: error.message });
  }
}

module.exports = { getRecords };
