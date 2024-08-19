const Event = require("../model/Event");

const eventAdding = async (req, res) => {
  const { date, time, description } = req.body;
  if (!date || !time || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const userId = req.user._id;
    const event = new Event({
      date: date,
      time: time,
      description: description,
      user: userId,
    });
    await event.save();
    return res.status(200).json({ message: "Event added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const eventList = async (req, res) => {
  const events = await Event.find({ user: req.user._id });
  return res.status(200).json({ events: events });
};

const eventUpdate = async (req, res) => {
  const { id, date, time, description } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      { _id: id, user: req.user._id },
      { date, time, description },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eventDelete = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedEvent = await Event.findByIdAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  eventAdding,
  eventList,
  eventUpdate,
  eventDelete,
};
