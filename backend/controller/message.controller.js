import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";










export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save()
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); // run parallel
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};























   










   
























export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};












// export const deleteConversation = async (req, res) => {
//     try {
//         const { id: otherUser Id } = req.params;
//         const currentUser Id = req.user._id;

//         // Find the conversation between the two users
//         const conversation = await Conversation.findOne({
//             members: { $all: [currentUser Id, otherUser Id] },
//         });

//         if (!conversation) {
//             return res.status(404).json({ message: "Conversation not found" });
//         }

//         // Delete all messages in the conversation
//         await Message.deleteMany({ _id: { $in: conversation.messages } });

//         // Delete the conversation
//         await Conversation.findByIdAndDelete(conversation._id);

//         res.status(200).json({ message: "Conversation deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting conversation:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };































   

