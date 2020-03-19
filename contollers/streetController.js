const street = require("../modal/streetModal");

exports.create = async (req, res) => {
  const arrays = req.body;

  try {
    const idCheck = await street.findOneAndUpdate(
      {
        $and: [{ ward: req.body.ward }, { streetNumber: req.body.streetNumber }]
      },
      {
        streetName: req.body.streetName,
        streetNumber: req.body.streetNumber,
        fromHouseNumber: req.body.fromHouseNumber,
        toHouseNumber: req.body.toHouseNumber,
        noOfHouses: req.body.noOfHouses,
        waterMan: req.body.waterMan,
        ward: req.body.ward
      },
      { upsert: true }
    );
    return res.status(200).send({
      status: 200,
      error: "",
      message: "Created successfully..!"
    });
  } catch (error) {
    return res
      .status(400)
      .send({ status: 400, error: error, message: "Failed" });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await street.find();
    return res.status(200).send({ status: 200, error: "", result: data });
  } catch (err) {
    return res
      .status(400)
      .send({ status: 400, error: err, message: "Failed!" });
  }
};

exports.update = async (req, res) => {
  try {
    const file = await street.findByIdAndUpdate(req.params.ID, req.body, {
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
    const del = await street.findOneAndDelete({ _id: req.params.ID });

    if (del == null) {
      throw err;
    }

    res.status(200).send({
      status: 200,
      error: "",
      data: "Deleted successfully"
    });
  } catch (err) {
    return res.status(400).send({ status: 400, error: err, message: "Failed" });
  }
};

exports.byWard = async (req, res) => {
  try {
    const del = await street.find({ ward: req.params.ID });

    res.status(200).send({
      status: 200,
      error: "",
      data: del
    });
  } catch (err) {
    return res.status(400).send({ status: 400, error: err, message: "Failed" });
  }
};

exports.updateByWard = async (req, res) => {
  try {
    const file = await street.updateMany(
      { ward: req.params.ID },
      { $set: { waterMan:  req.params.waterMan } }
    );
    res
      .status(200)
      .send({ status: "success", message: "Updated successfully", data: file });
  } catch (err) {
    return res
      .status(400)
      .send({ status: 400, error: err, message: "Failed to update " });
  }
};
exports.updateByStreet = async (req, res) => {
  try {
    const file = await street.updateMany(
      { _id: req.params.ID },
      { $set: { waterMan:  req.params.waterMan } }
    );
    res
      .status(200)
      .send({ status: "success", message: "Updated successfully", data: file });
  } catch (err) {
    return res
      .status(400)
      .send({ status: 400, error: err, message: "Failed to update " });
  }
};
