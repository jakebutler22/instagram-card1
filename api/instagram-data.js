api/instagram-data.js

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "instagram-data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(JSON.parse(fileContents));
}