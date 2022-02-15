const express = require("express");
const app = express();
const session = require("express-session");
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authUser = require("./routes/users");
const product = require("./routes/products");
const productCategory = require("./routes/categories_product");
/*
const role = require("./routes/roles");
const company = require("./routes/companies");
const price = require("./routes/prices");
const categoriesCompany = require("./routes/categories_company");
const order = require("./routes/orders");
const orderEntries = require("./routes/order_entries");
const socketIo = require("socket.io");

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});*/
//const getApiAndEmit = "TODO";
const port = process.env.PORT || 3010;
dotenv.config();

// Connect to DB

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  console.log("connected to database")
);

app.use(
  cors({
    credentials: true,
    //origin: ["http://localhost:8100", "http://localhost:3000"],
    origin: "*",
    methods: ["GET", "POST","DELETE"],
  })
);

//Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(
  session({
    secret: "ssshhhhh",
    saveUninitialized: true,
    resave: true,
    cookie: {
      secure: false,
    },
  })
);
// Route Middleware

app.use("/api/user", authUser);
app.use("/api/product", product);
/*
app.use("/api/role", role);
app.use("/api/company", company);
app.use("/api/price", price);
app.use("/api/productCategory", productCategory);
app.use("/api/categComp", categoriesCompany);
app.use("/api/order", order);
app.use("/api/orderEntries", orderEntries);
*/
/*app.set('socketio', io);

io.on('connect', socket => {
  
  socket.emit('id', socket.id) // send each client their socket id
})*/

/*io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  app.set("socket", socket);
});*/

//app.use('/api/user',authRoute);


//socket.on('getMessages', () => this.getMessages());
/*let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};*/

/*io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
  app.set("socket", socket);
})*/

//export {io};
server.listen(port, () => console.log(`server is runing in ${port}`));
