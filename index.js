const http = require("http");
const fs = require("fs");
const mongoose = require("mongoose");
const urlController = require("./controllers/urlController");
mongoose.connect("mongodb://127.0.0.1:27017/urlObj", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      fs.readFile("./index.html", "utf8", (err, data) => {
        res.setHeader("Content-type", "text/html");
        if (err) {
          console.log(err);
          res.write("Server Error");
        }
        res.write(data);
        res.end();
      });
    } else {
      let shortUrl = req.url.slice(1);
      if (shortUrl !== "favicon.ico") {
        console.log(shortUrl);
        let url = await urlController.findUrl(shortUrl);
        if (url === undefined) {
          fs.readFile("./error.html", "utf8", (err, data) => {
            res.setHeader("Content-type", "text/html");
            if (err) {
              console.log(err);
              res.write("Server Error");
            }
            res.write(data);
            res.end();
          });
        } else {
          console.log(url);
          res.writeHead(301, { Location: url });
          res.end();
        }
      }
    }
  } else if (req.method === "POST") {
    let url = "";
    req.on("data", (data) => {
      console.log("data", data);
      url += data.toString();
    });

    req.on("end", async () => {
      url = url.split("=")[1];

      console.log(url);
      let shortUrl = await urlController.addNewUrl(decodeURIComponent(url));

      fs.readFile("./result.html", "utf8", (err, data) => {
        res.setHeader("Content-type", "text/html");
        if (err) {
          console.log(err);
          res.write("Server Error");
        }

        res.write(data);

        res.write("<p>http://localhost:3000/" + shortUrl + "</p>");
        res.end();
      });
    });
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening on 3000");
});
