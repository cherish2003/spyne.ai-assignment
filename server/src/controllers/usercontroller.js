const User = require("../models/user.model.js").User;
const Car = require("../models/car.model.js").Car;
const cloudinary = require("../utils/cloudinary.js");
const fs = require("fs");

const createNewcar = async function (req, res) {
  const { title, description, tags } = req.body;
  const { data } = req.user;

  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "cars",
      });
      uploadedFiles.push(result.secure_url);

      console.log(result);

      fs.unlinkSync(file.path);
    }

    const newCar = new Car({
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      images: uploadedFiles,
      owner: data?._id,
    });

    console.log("newCar :", newCar);

    await newCar.save();
    res
      .status(201)
      .json({ message: "New car details uploaded successfully!", car: newCar });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error uploading car details", details: error.message });
  }
};
const deleteCar = async function (req, res) {
  const { carId } = req.params;
  const { data } = req.user;
  console.log("carId :", carId);

  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    if (car.owner.toString() !== data._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this car" });
    }

    const imageDeletionPromises = car.images.map((imageUrl) => {
      const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
      return cloudinary.uploader.destroy(`cars/${publicId}`);
    });
    await Promise.all(imageDeletionPromises);

    await Car.findByIdAndDelete(carId);

    res.status(200).json({ message: "Car deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting car", details: error.message });
  }
};

module.exports = { createNewcar, deleteCar };
