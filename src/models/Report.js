const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const ReportSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  anonymous: Boolean,
  urban: Boolean,
  timestamp: String,
  name: String,
  email: String,
  phone: String,
  place: String,
  zone: String,
  number: String,
  cep: String,
  city: String,
  state: String,
  reference: String,
  type: String,
  description: String,
  status: String,
  name_img: String,  
  size_img: Number, 
  key_img: String, 
  url_img: String
});

ReportSchema.pre("save", function() {
  if (!this.url_img) {
    this.url_img = `${process.env.APP_URL}/files/${this.key_img}`;
  }
});

ReportSchema.pre("remove", function() {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.key_img
      })
      .promise()
      .then(response => {
        console.log(response.status);
      })
      .catch(response => {
        console.log(response.status);
      });
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key_img)
    );
  }
});

module.exports = mongoose.model("Report", ReportSchema);