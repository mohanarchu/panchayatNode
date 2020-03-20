const users = require("../modal/usermodal");

exports.create = async (req, res) => {
  try {
    await users.insertMany({
      userName: req.body.userName.toLowerCase().trim(),
      displayName: req.body.displayName,
      password: req.body.password,
      userEmail: req.body.userEmail,
      userMobile: req.body.userMobile,
      userId: Math.random()
        .toString(36)
        .slice(2),
      ward: req.body.ward,
      blood: req.body.blood,
      imagePath: "",
      designation: req.body.designation,
      designationId: req.body.designationId
    });
    return res
      .status(200)
      .send({ status: 200, error: "", message: "Created successfully..!" });
  } catch (error) {
    return res
      .status(400)
      .send({ status: 400, error: error, message: "Create User Failed!" });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    const data = await users.find(queryObj);
    return res.status(200).send({ status: 200, error: "", result: data });
  } catch (err) {
    return res
      .status(400)
      .send({ status: 400, error: err, message: "Failed to get users!" });
  }
};

exports.update = async (req, res) => {
  try {
    const file = await users.findByIdAndUpdate(req.params.ID, req.body, {
      new: true,
      runValidators: true
    });
    res
      .status(200)
      .send({ status: "success", message: "Updated successfully", data: file });
  } catch (err) {
    return res
      .status(400)
      .send({ status: 400, error: err, message: "Failed to update " });
  }
};

exports.delete = async (req, res) => {
  try {
    await users.findOneAndDelete(req.params.ID);
    res.status(200).send({
      status: 200,
      error: "",
      data: "user deleted successfully"
    });
  } catch (err) {
    return res.status(400).send({ status: 400, error: err, message: failed });
  }
};

exports.viewUser = async (req, res) => {
  try {
    const data = await users.find( { userMobile: req.params.ID });
    res.status(200).json({ status: 200, error: "", data: data });
  } catch (err) {
    return res.status(400).send({ status: 400, error: err, message: "failed" });
  }
};

