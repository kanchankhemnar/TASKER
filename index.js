const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});
//
app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("show", { fileName: req.params.filename, filedata: filedata });
  });
});
//
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title}`, req.body.details, (err) => {
    res.redirect("/");
  });
});

app.post("/edit", (req, res) => {
  console.log(req.body);

  fs.rename(
    `./files/${req.body.previousName}`,
    `./files/${req.body.newName}`,
    (err) => {
      // console.log(err.message);
      res.redirect("/");
    }
  );
});
app.get("/delete/:filename",(req,res)=>{
  // console.log(req.params.filename);
  const filename = req.params.filename;
  const filePath = path.resolve(__dirname,'files',  filename);
  console.log(filePath);
  fs.unlink(filePath, (err) => {
    // console.log("file deleted");
    res.redirect("/");
  });
});

app.listen(3000);
