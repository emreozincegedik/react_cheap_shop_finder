const Scrape = require("./Scrape");
const Influx = require("influxdb-nodejs");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const client = new Influx(process.env.influx);
const schemaName = "crawl";
client.schema(schemaName, {
  query: "string",
  title: "string",
  price: "float",
  img: "string",
  link: "string",
  website: "string",
});
const fieldSchema = {
  query: "s",
  title: "s",
  price: "f",
  img: "s",
  link: "s",
  website: "s",
};
const tagSchema = {};
client.schema(schemaName, fieldSchema, tagSchema, {
  // default is false
  stripUnknown: true,
});

var websites_shop = ["hepsiburada", "n11", "gittigidiyor", "amazon"];
var price_low = 0;
var price_high = 99999;

const { request } = require("express");
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
    .replace(/ç/gim, "c")
    .toLowerCase();
}
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
app.use(cors());
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/", (req, res) => {
  var request = { websites: [] };
  if (req.body.query == "" || !("query" in req.body)) {
    res.status(400);
    res.send(`Incorrect post body, include query`);
    throw new Error(req.body);
  }
  request.query = req.body.query;
  if (typeof req.body.query != "string") {
    request.query = req.body.query.toString();
  }

  websites_shop.forEach((element) => {
    if (element in req.body) {
      if (typeof req.body[element] != "boolean") {
        res.status(400);
        res.send(`Incorrect post body, ${element} must be true or false`);
        throw new Error(req.body);
      }
      if (req.body[element]) {
        request.websites.push(element);
      }
    } else {
      request.websites.push(element);
    }
  });

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

  client
    .query(schemaName)
    .where("query", turkishNormalize(request.query))
    .where("website", websites_shop)
    .where("price", request.price_low, ">=")
    .where("price", request.price_high, "<=")
    .then((dbRes) => {
      if (dbRes.results[0].series != null) {
        console.log("found on db");
        // console.log(dbRes.results[0].series[0]);
        var responseArray = [];
        const price_col_num = dbRes.results[0].series[0].columns.indexOf(
          "price"
        );
        const img_col_num = dbRes.results[0].series[0].columns.indexOf("img");
        const link_col_num = dbRes.results[0].series[0].columns.indexOf("link");
        const title_col_num = dbRes.results[0].series[0].columns.indexOf(
          "title"
        );
        const website_col_num = dbRes.results[0].series[0].columns.indexOf(
          "website"
        );
        // console.log(request.websites);
        // console.log(price_col_num);
        dbRes.results[0].series[0].values.forEach((el) => {
          if (request.websites.includes(el[website_col_num])) {
            responseArray.push({
              img: el[img_col_num],
              title: el[title_col_num],
              link: el[link_col_num],
              price: el[price_col_num],
              website: el[website_col_num],
            });
          }
        });
        res.json(responseArray);
        res.status(200);
        return;
        console.log(responseArray);
        // console.log(res.results[0].series[0].values.length);
      } else {
        console.log("not on db, starting scrape");
        const scrape = new Scrape(turkishNormalize(request.query));
        scrape.promise_func(websites_shop).then(() => {
          let responseArray = [];
          scrape.itemList.forEach((el) => {
            if (
              ((el.price < req.body.price_high &&
                el.price > req.body.price_low) ||
                (el.price > req.body.price_high &&
                  el.price < req.body.price_low)) &&
              request.websites.includes(el.website)
            ) {
              responseArray.push(el);
            }
          });
          res.json(responseArray);
          res.status(200);
          scrape.itemList.forEach((el) => {
            client
              .write(schemaName)
              .tag({})
              .field(el)
              .then()
              .catch(console.error);
          });
        });
      }
    })
    .catch(console.error);
});

/*app.post("/suggestion", (req, res) => {
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
});*/
