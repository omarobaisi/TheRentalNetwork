const User = require("../Model/user");
const Record = require("../Model/rentRecord");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(404).json({ message: "Coudn't find users", error: e });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
  } catch (e) {
    res.status(404).json({ message: "Coudn't find The user", error: e });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).json({ success: false, message: "Not logged in" });
  }
};

module.exports.register = async (req, res) => {
  try {
    const { password } = req.body;
    const { user } = req.body;
    const newUser = new User(user);
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) res.status(404).json({ message: "Coudn't login", error: e });
      res.send(req.user);
    });
  } catch (e) {
    res.status(404).json({ message: "Coudn't register", error: e });
  }
};

module.exports.login = async (req, res) => {
  res.send(req.user);
};

module.exports.logout = async (req, res) => {
  req.logout();
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
      runValidators: true,
    });
    res.send(updatedUser);
  } catch (e) {
    res.status(404).json({ message: "Coudn't update the user", error: e });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id, { new: true });
    res.send(deletedUser);
  } catch (e) {
    res.status(404).json({ message: "Coudn't delete the user", error: e });
  }
};

module.exports.userRecord = async (req, res) => {
  const userId = req.params.id;
  const records = await Record.find()
    .populate({
      path: "product",
      populate: [
        {
          path: "owner",
        },
      ],
    })
    .populate("renter");
  recordsArray = [];
  records.forEach((record) => {
    if (record.renter._id == userId) {
      recordsArray.push(record);
    }
  });
  res.send(recordsArray);
};
