const express = require("express");
const app = express();
const port = 3003;
const middleware = require("./middleware");
const path = require("path");
const mongoose = require("./database");
const session = require("express-session");

const server = app.listen(port, () => console.log("Server listening on port " + port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(session({
    secret: "nice car you have",
    resave: true,
    saveUninitialized: false
}))

app.use(express.static(path.join(__dirname, "public")));

//Routes 

const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logoutRoutes");
const postRoute = require("./routes/postRoutes");
const profileRoute = require("./routes/profileRoutes");
const searchRoute = require("./routes/searchRoutes");
const notificationsRoute = require("./routes/notificationRoutes");

// API Routes

const postsApiRoute = require("./routes/api/posts");
const usersApiRoute = require("./routes/api/users");
const notificationApiRoutes = require("./routes/api/notifications");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/posts", middleware.requirelogin, postRoute);
app.use("/profile", middleware.requirelogin, profileRoute);
app.use("/logout", logoutRoute);
app.use("/search", middleware.requirelogin, searchRoute);
app.use("/notifications", middleware.requirelogin, notificationsRoute);

app.use("/api/posts", postsApiRoute);
app.use("/api/users", usersApiRoute);
app.use("/api/notifications", notificationApiRoutes);

app.get("/", middleware.requirelogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }
    res.status(200).render("home", payload);
});
