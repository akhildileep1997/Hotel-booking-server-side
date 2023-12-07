const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const moment = require('moment')



// booking a room
router.post("/book-room", async (req, res) => {
    const { room, userId, fromDate, toDate, totalAmount, totalDays } = req.body;
    console.log('inside room booking api');
    try {
      const newBooking = new Booking({
        room: room.name,
        roomId: room._id,
        userId,
        fromDate: moment(fromDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
        toDate: moment(toDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
        totalAmount,
        totalDays,
        transactionId: "1234",
      });
      const booking = await newBooking.save();

     const bookedRoomDetails = await Room.findOneAndUpdate(
       { _id: room._id },
       {
         $push: {
           currentBookings: {
             bookingId: booking._id,
             fromDate: moment(fromDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
             toDate: moment(toDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
             userId,
             status: booking.status,
           },
         },
       },
       { new: true }
     );

      console.log("inside room bookig api 2 >>>>>>.");
      console.log(booking);
      res.status(200).send(booking);
    } catch (error) {
      console.error("Error in room booking:", error);
      res.status(500).json("Failed to book room");
    }
});

router.post("/get-booked-roomById", async (req, res) => {
  const userid = req.body.userid
  console.log(userid);
  try {
    console.log('inside get bookings api');
    const bookings = await Booking.find({ userId: userid }) 
    console.log(userid);
    console.log(bookings,'5814899484184');
    res.send(bookings).status(200)
  } catch (error) {
    res.status(400).json(error)
    console.log(error);
  }
});




//cancel bookings
router.post("/cancel-booking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  console.log(bookingid, "Booking id is");
  console.log(roomid, "Room id is");
  try {
    console.log("inside cancel booking api");

    // Find and update the booking status
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingid },
      { $set: { status: "canceled" } },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    console.log("inside cancel api >>> 2");

    // Find the room and update the currentBookings array
    const room = await Room.findOne({ _id: roomid });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    console.log("inside cancel api >>> 3");

    room.currentBookings = room.currentBookings.filter(
      (booking) => booking.bookingId.toString() !== bookingid
    );

    console.log("inside cancel api >>> 4");

    await room.save();

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error.message);
    res.status(400).json({ error: error.message });
  }
});


//receiving all booking in admin page

router.get("/get-all-bookings", async (req, res) => {
  try {
    console.log('inside fetching all bookings api');
    const bookings = await Booking.find()
    console.log(bookings);
    res.status(200).json(bookings)
  } catch (error) {
    res.status(400).json(error)
  }
});





module.exports=router
