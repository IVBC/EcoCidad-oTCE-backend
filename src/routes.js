const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const email = require("./config/nodemailer");
const Report = require("./models/Report");

routes.get("/reports", async (req, res) => {
  const reports = await Report.find();

  return res.json(reports);
});

routes.post("/reports", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name_img, size: size_img, key: key_img, location: url_img = "" } = req.file;
  let data = Object.assign(req.body, {
    name_img,
    size_img,
    key_img,
    url_img
  })
  const report = await Report.create(data);
  email.sendEmail(report);
  return res.json(report);
});

routes.delete("/reports/:id", async (req, res) => {
  const report = await Report.findById(req.params.id);

  await report.remove();

  return res.send();
});

module.exports = routes;