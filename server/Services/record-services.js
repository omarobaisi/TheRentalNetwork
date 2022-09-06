const Record = require("../Model/rentRecord");
const Product = require("../Model/product");
const User = require("../Model/user");

module.exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find({})
      .populate({
        path: "product",
        populate: [
          {
            path: "owner",
          },
        ],
      })
      .populate("renter");
    res.send(records);
  } catch (e) {
    res.status(404).json({ message: "Coudn't find records", error: e });
  }
};

module.exports.getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id)
      .populate("product")
      .populate("renter");
    res.send(record);
  } catch (e) {
    res.status(404).json({ message: "Coudn't find records", error: e });
  }
};

module.exports.getUserRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id)
      .populate("product")
      .populate("renter");
    res.send(record);
  } catch (e) {
    res.status(404).json({ message: "Coudn't find records", error: e });
  }
};

module.exports.newRecord = async (req, res) => {
  const { productId } = req.params;
  const { info, payment } = req.body;
  const foundProduct = await Product.findById(productId);
  let newRecord = new Record({
    product: foundProduct,
    renter: req.user,
    renterInfo: info,
    payment: payment,
  });
  newRecord = await newRecord.save();
  res.send(newRecord);
};

module.exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = req.body;
    const updatedrecord = await Record.findByIdAndUpdate(id, record, {
      new: true,
      runValidators: true,
    });
    res.send(updatedrecord);
  } catch (e) {
    res.status(404).json({ message: "Coudn't update the record", error: e });
  }
};

module.exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedrecord = await Record.findByIdAndDelete(id, { new: true });
    res.send(deletedrecord);
  } catch (e) {
    res.status(404).json({ message: "Coudn't delete the record", error: e });
  }
};
