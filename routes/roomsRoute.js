const express = require("express");

const router = express.Router();

const Room = require("../models/roomModel");
const { route } = require("./userRoute");

//for adding new rooms
router.post("/add-room", async (req, res) => {
  const {
    name,
    description,
    location,
    facilities,
    rentPerDay,
    maxCount,
    phoneNumber,
    type,
    imageUrls,
  } = req.body;

  const roomDetails = {
    name,
    description,
    location,
    facilities,
    rentPerDay,
    maxCount,
    phoneNumber,
    type,
    imageUrls,
  };
  try {
    console.log("inside add room api");
    const newRoom = new Room(roomDetails);
    await newRoom.save();
    console.log("new rooms are >>>", newRoom);
    res.status(200).json(newRoom);
  } catch (error) {
    res.status(400).json(error);
  }
});

// for getting all rooms
router.get("/all-rooms", async (req, res) => {
  try {
    console.log("inside all rooms api");
    const allRooms = await Room.find({});
    if (allRooms) {
      console.log(allRooms);
      res.status(200).json(allRooms);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//for getting a particular room by id

router.post("/getroombyId", async (req, res) => {
  const roomId = req.body.roomId;
  try {
    console.log("inside getting a particular rooms api");
    const room = await Room.findOne({ _id: roomId });
    if (room) {
      console.log(room);
      res.status(200).json(room);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//for getting all added rooms for admin side

router.get("/get-all-rooms", async (req, res) => {
  try {
    console.log("inside get all rooms api");
    const rooms = await Room.find();
    console.log(rooms);
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.delete("/delete-room/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log("inside delete api");
    const rooms = await Room.deleteOne({ _id: id });
    console.log(rooms);
    console.log("inside delete-api >>>>>>>>>>>> 2");
    res.status(200).json({ message: "room deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/get-room/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log("inside update room api");
    const room = await Room.findOne({ _id: id });
    console.log(room);
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

router.post("/update-room-details/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    facilities,
    rentPerDay,
    maxCount,
    phoneNumber,
    type,
    imageUrls,
  } = req.body;
  try {
    console.log("inside update room details API fully >>>>>>>>>>>>>");
    const roomDetails = await Room.findOne({ _id: id });
    roomDetails.name = name;
    roomDetails.description = description;
    roomDetails.facilities = facilities;
    roomDetails.rentPerDay = rentPerDay;
    roomDetails.maxCount = maxCount;
    roomDetails.phoneNumber = phoneNumber;
    roomDetails.type = type;
    roomDetails.imageUrls = imageUrls;

    await roomDetails.save();

    console.log(roomDetails);
    res.status(200).json(roomDetails);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
