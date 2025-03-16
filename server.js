// const express = require("express");
// const app = express();

// const port = process.env.PORT || 8080;

// app.get("/", (req, res) => {
//   res.send("Subscribe to Arpan Neupane's channel");
// });

// app.listen(port, () => {
//   `Server started on port ${port}`;
// });

require("dotenv").config({path:'./.env'});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const MONGO_URI = 'mongodb+srv://tamclone123:trung10112004@account.htloj.mongodb.net/?retryWrites=true&w=majority&appName=Account'
const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Định nghĩa Schema và Model
const FavoriteMovieSchema = new mongoose.Schema({
    id: String,
    name: String,
    slug: String,
    thumb_url: String,
    poster_url: String,
});
const ItemSchema = new mongoose.Schema({
    // name: String,
    // price: Number
    id: String,
    accountId: String,
    email: String,
    password: String,
    FullName: String,
    UserImage: String,
    FavoriteMovie: [FavoriteMovieSchema]
});
const Item = mongoose.model("Item", ItemSchema);
let message;
// API để lấy dữ liệu từ MongoDB
app.get("/", async (req, res) => {//tùy chỉnh link để hiện thị data
    try {
        const items = await Item.find();
        res.json(items);
        message = 'Success';
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
        message = 'Fail';
    }
    res.send("<h1>Connected to server: " + message +' </h1>');
});

// // thêm data
// app.post("", async (req, res) => {
//     const { id, accountId, email, password, FullName, UserImage, FavoriteMovie } = req.body;
//     if (!id || !accountId || !email || !password || !FullName || !UserImage) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const newItem = new Item({ id, accountId, email, password, FullName, UserImage, FavoriteMovie });
//         await newItem.save();
//         res.status(201).json({ message: "Item added successfully", item: newItem });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding item" });
//     }
// });
app.post("/signin", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Chạy server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));