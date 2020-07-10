const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

require("dotenv").config();
const Scrape = require("./Scrape");
const { request } = require("express");

function ObjToArray(obj) {
  var newArr = [];
  obj.forEach((element) => {
    var arr = Object.values(element);
    newArr.push(arr);
  });
  return newArr;
}
function doWeHaveThatWebsite(obj, str) {
  var exists = false;
  obj.forEach((element) => {
    if (element["website"] === str) {
      exists = true;
    }
  });
  return exists;
}
function turkishNormalize(str) {
  return str
    .replace(/Ğ/gim, "g")
    .replace(/Ü/gim, "u")
    .replace(/Ş/gim, "s")
    .replace(/I/gim, "i")
    .replace(/İ/gim, "i")
    .replace(/Ö/gim, "o")
    .replace(/Ç/gim, "c")
    .replace(/ğ/gim, "g")
    .replace(/ü/gim, "u")
    .replace(/ş/gim, "s")
    .replace(/ı/gim, "i")
    .replace(/ö/gim, "o")
    .replace(/ç/gim, "c");
}

function checkDate(arr) {
  //if older than a day, return true
  // console.log(arr);
  var a = false;
  try {
    arr.forEach((element) => {
      if (
        (new Date().getTime() - element["date"].getTime()) / 1000 >
        process.env.date_old
      ) {
        //console.log((new Date().getTime() - element["date"].getTime()) / 1000);
        //older than a day
        a = true;
        throw breakException;
      }
    });
  } catch (error) {}

  return a;
}

const app = express();
const port = process.env.PORT || 5000;

const con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.pass,
  database: process.env.db,
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to db!");
});

app.use(cors());
app.use(express.json());

websites = ["hepsiburada", "gittigidiyor", "n11", "amazon"];
app.post("/", (req, res) => {
  var request = {};
  if (req.body.query == "" || !("query" in req.body)) {
    res.status(400);
    res.send(`Incorrect post body, include query`);
    throw new Error(req.body);
  }
  request.query = req.body.query;
  if (typeof req.body.query != "string") {
    request.query = req.body.query.toString();
  }

  websites.forEach((element) => {
    if (element in req.body) {
      if (typeof req.body[element] != "boolean") {
        res.status(400);
        res.send(`Incorrect post body, ${element} must be true or false`);
        throw new Error(req.body);
      }
      request[element] = req.body[element];
    } else {
      request[element] = true;
    }
  });
  // "asd" -> NaN == "asd"
  //"123" -> 123 == "123"
  if (
    parseInt(req.body.price_high) != req.body.price_high ||
    parseInt(req.body.price_low) != req.body.price_low
  ) {
    res.status(400);
    res.send(`Incorrect post body, prices must be numbers`);
    throw new Error(req.body);
  }
  request.price_low = req.body.price_low != null ? req.body.price_low : 0;
  request.price_high =
    req.body.price_high != null ? req.body.price_high : 999999;
  console.log(request);
  var val = [];

  for (var key in request) {
    val.push(
      typeof request[key] == "boolean"
        ? request[key]
          ? key
          : ""
        : request[key]
    );
  }

  const valString =
    "query=? and (website in (?,?,?,?)) and (price between ? and ?)";

  con.query(`SELECT * FROM results where ${valString}`, val, function (
    err,
    result,
    fields
  ) {
    if (err) throw err;
    // console.log(fields);
    // console.log(result);
    // console.log(
    //   result.length <= 4,
    //   request["n11"] && !doWeHaveThatWebsite(result, "n11"),
    //   request["gittigidiyor"] && !doWeHaveThatWebsite(result, "gittigidiyor"),
    //   request["hepsiburada"] && !doWeHaveThatWebsite(result, "hepsiburada"),
    //   request["amazon"] && !doWeHaveThatWebsite(result, "amazon"),
    //   checkDate(result)
    // );
    if (
      // false

      result.length <= 4 ||
      (request["n11"] && !doWeHaveThatWebsite(result, "n11")) ||
      (request["gittigidiyor"] &&
        !doWeHaveThatWebsite(result, "gittigidiyor")) ||
      (request["hepsiburada"] && !doWeHaveThatWebsite(result, "hepsiburada")) ||
      (request["amazon"] && !doWeHaveThatWebsite(result, "amazon")) ||
      checkDate(result)
    ) {
      var promiseArray = [];

      if (request.hepsiburada) promiseArray.push("hepsiburada");
      if (request.n11) promiseArray.push("n11");
      if (request.gittigidiyor) promiseArray.push("gittigidiyor");
      if (request.amazon) promiseArray.push("amazon");

      if (promiseArray.length == 0) {
        console.log("no website specified");
        res.status(400);
        res.send("no website specified");
        return;
      }
      console.log("crawling starts");
      const scrape = new Scrape(turkishNormalize(request["query"]));
      scrape.promise_func(promiseArray).then(() => {
        con.query(`delete from results where ${valString}`, val, function (
          error_delete,
          res_delete,
          fields_delete
        ) {
          if (error_delete) throw error_delete;
          console.log("deleted older queries");
        });
        // console.log(scrape.itemList);
        con.query(
          `insert into results (query,title,price,img,link,website) values ?`,
          [ObjToArray(scrape.itemList)],
          function (error_insert, result_insert, fields_insert) {
            if (error_insert) throw error_insert;
            console.log("inserting");
            console.log(result_insert);
          }
        );
        let newList = [];
        scrape.itemList.forEach((element) => {
          if (
            (element.price < request.price_high &&
              element.price > request.price_low) ||
            (element.price > request.price_high &&
              element.price < request.price_low)
          ) {
            newList.push(element);
          }
        });

        res.json(newList);
      });
    } else {
      console.log("found existing");
      // console.log(result);
      res.json(result);
    }
  });

  //console.log("request main page using post");
});

app.post("/suggestion", (req, res) => {
  if (!("suggestion" in req.body) || req.body.suggestion == "") {
    res.status(400);
    res.send(`Incorrect post body, include suggestion`);
    throw new Error(req.body);
  }
  if (req.body.suggestion.length <= 0 || req.body.suggestion.length > 300) {
    res.status(400);
    res.send(
      `Incorrect post body, suggestion length can be between 0-300, yours: ${req.body.suggestion.length}`
    );
    throw new Error(req.body.suggestion);
  }

  const valString = "insert into suggestions (email,suggestion) values (?,?)";

  con.query(
    valString,
    [req.body.email, req.body.suggestion],
    (err, result, fields) => {
      if (err) throw err;
      console.log("inserted new suggestion:");
      console.log(req.body);
      res.status(200);
      res.json({ message: "suggestion received" });
    }
  );
});
