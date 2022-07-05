module.exports = {
   DB_URI: process.env.DB_URI || "mongodb+srv://user:user@cluster0.jgqf3.mongodb.net/?retryWrites=true&w=majority",
   PORT: process.env.PORT || 5000,
   SECRET_KEY: process.env.SECRET_KEY || "kakoy-to-kluch",
}