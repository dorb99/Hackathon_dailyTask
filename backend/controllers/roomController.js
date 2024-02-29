const Room = require("../schemas/roomSchema");

exports.createRoom = async (req, res) => {
  const { roomId, students, teacher } = req.body;
  if (!roomId || !students || !teacher)
    return res.status(404).send("not enough data");
  try {
    const newRoom = await Room.create({
      roomId,
      students,
      teacher,
    });
    if (!newRoom) return res.status(405).send("data incorrect");
    res.status(200).send("Room created successfully");
  } catch (error) {
    res.send(error);
  }
};

exports.getRoom = async (req, res) => {
  const roomId = req.body.roomId;
  if (!roomId) return res.status(404).send("not enough data");
  try {
    const room = await Room.findById({ roomId });
    if (!room) return res.status(405).send("wrong roomId");
    res.status(200).send("Room created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRoom = async (req, res) => {
  const roomId = req.body.roomId;
  if (!roomId) return res.status(404).send("not enough data");
  try {
    const replacedRoom = await Room.findOneAndDelete({ roomId });
    if (!replacedRoom) return res.status(405).send("wrong roomId");
    res.status(200).send("Room deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
