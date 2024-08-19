const Event = require("../model/Event");
const eventFind = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findOne({ _id: id, user: req.user._id });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ event: event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  eventFind,
};
