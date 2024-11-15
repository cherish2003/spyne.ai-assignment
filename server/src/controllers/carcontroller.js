const Car = require("../models/car.model.js").Car;

const getUserCars = async function (req, res) {
  try {
    const { data } = req.user;
    console.log("data :", data);

    const cars = await Car.find({ owner: data._id });
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editCardDetails = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { title, description, tags },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updatedCar); // Return the updated car details
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Server error while updating car" });
  }
};
const searchCars = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    // If there is a search query, filter cars based on title, description, or tags
    const query = searchQuery
      ? {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on title
            { description: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on description
            { tags: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on tags
          ],
        }
      : {};

    const cars = await Car.find(query); // Fetch cars based on the query
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ success: false, message: "Error fetching cars" });
  }
};
module.exports = { getUserCars, editCardDetails, searchCars };
