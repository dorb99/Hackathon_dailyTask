const Room = require("../schemas/roomSchema");

exports.createRoom = async (req, res) => {
  const { roomId, students, teacher } = req.body;
  if (!roomId || !students || !teacher)
    return res.status(404).send("wrong information");
  try {
    const newRoom = await Room.create({
      roomId,
      students,
      teacher,
    });
    res.status(200).send("Room created successfully");
  } catch (error) {
    res.send(error);
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById({ roomId: req.params.roomId });
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAndDeleteRoom = async (req, res) => {
  try {
    const replacedRoom = await Room.findOneAndDelete({
      RoomId: req.body.RoomId,
    });
    res.send(replacedRoom);
  } catch (error) {
    res.send(error);
  }
};
