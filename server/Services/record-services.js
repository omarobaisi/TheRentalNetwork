const Record = require('../Model/rentRecord')
const Product  = require('../Model/product')

module.exports.getRecords = async (req, res) => {
    try {
        const records = await Record.find({}).populate({
            path: 'product',
            populate: [
              {
                path: 'owner',
              },
            ],
          }).populate("renter")
        res.send(records)
    } catch(e) {
        res.status(404).json({ message: "Coudn't find records", error: e })
    }
}

module.exports.getRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Record.findById(id).populate("product").populate("renter")
        res.send(record)
    } catch(e) {
        res.status(404).json({ message: "Coudn't find records", error: e })
    }
}

module.exports.newRecord = async (req, res) => {
    try {
        const { productId } = req.params;
        let newRecord = new Record();
        const product = await Product.findById(productId)
        newRecord.product = product
        newRecord.renter = req.user
        newRecord = await newRecord.save()
        res.send(newRecord)
    } catch(e) {
        res.status(404).json({ message: "Coudn't create the record", error: e })
    }
}

module.exports.updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const record = req.body
        const updatedrecord = await Record.findByIdAndUpdate(id, record, { new: true, runValidators: true } )
        res.send(updatedrecord);
    } catch(e) {
        res.status(404).json({ message: "Coudn't update the record", error: e })
    }
}

module.exports.deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedrecord = await Record.findByIdAndDelete(id, { new: true });
        res.send(deletedrecord);
    } catch(e) {
        res.status(404).json({ message: "Coudn't delete the record", error: e })
    }
}