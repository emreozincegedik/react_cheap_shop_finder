const cheerio = require("cheerio");
const fetch = require("node-fetch");

class Scrape {
  constructor(query) {
    this.query = query;
    this.itemList = [];

    this.crawl_n11 = (res) => {
      console.log("crawling n11");
      const $ = cheerio.load(res);
      const item = $(".clearfix .column");
      item.each((i, el) => {
        var iteminfo = {};
        iteminfo.query = this.query;
        iteminfo.title = $(el).find("h3").text().trim();
        var price = $(el)
          .find("ins")
          .text()
          .replace("TL", "")
          .trim()
          .replace(".", "")
          .replace(",", ".");
        iteminfo.price = parseFloat(price);
        if (isNaN(parseFloat(price))) {
          return;
        }

        iteminfo.img = $(el).find("img").attr("data-original");
        iteminfo.link = $(el).find("a").attr("href");
        iteminfo.website = "n11";
        // console.log(iteminfo);
        this.itemList.push(iteminfo);
        // console.log(iteminfo);
      });
    };
    this.crawl_hepsiburada = (res) => {
      console.log("crawling hepsiburada");
      const $ = cheerio.load(res);
      const item = $("div.product");
      item.each((i, el) => {
        var iteminfo = {};
        iteminfo.query = this.query;
        iteminfo.title = $(el).find(".title span").text().trim();
        var price = $(el)
          .find(".product-price , .price-value")
          .text()
          .replace("TL", "")
          .trim()
          .replace(".", "")
          .replace(",", ".");
        if (isNaN(parseFloat(price))) {
          return;
        }
        iteminfo.price = parseFloat(price);
        iteminfo.img = $(el).find("img").attr("data-src");
        iteminfo.link =
          "https://hepsiburada.com" + $(el).find("a").attr("href");
        iteminfo.website = "hepsiburada";
        // console.log($(el).find("img"));
        this.itemList.push(iteminfo);
        // return false;
      });
    };
    this.crawl_gittigidiyor = (res) => {
      console.log("crawling gittigidiyor");
      const $ = cheerio.load(res);

      const item = $("li.gg-uw-6");

      item.each((i, el) => {
        var iteminfo = {};
        iteminfo.query = this.query;
        iteminfo.title = $(el).find("h3").text().trim();
        let price = $(el)
          .find("p.price-txt")
          .text()
          .replace("TL", "")
          .trim()
          .replace(".", "")
          .replace(",", ".");
        //"starting with x" has different class
        if (price === "")
          price = $(el)
            .find(".fontb")
            .text()
            .replace("TL", "")
            .trim()
            .replace(".", "")
            .replace(",", ".");
        if (isNaN(parseFloat(price))) {
          return;
        }
        iteminfo.price = parseFloat(price);
        iteminfo.img = $(el).find("img.img-cont").attr("data-original");
        iteminfo.link = "https:" + $(el).find("a").attr("href");
        iteminfo.website = "gittigidiyor";

        this.itemList.push(iteminfo);
      });
    };

    this.crawl_amazon = (res) => {
      console.log("crawling amazon");
      const $ = cheerio.load(res);

      const item = $(".s-latency-cf-section .a-spacing-medium");
      // const item = $(".s-asin .sg-col-inner");
      // console.log(item.length);
      item.each((i, el) => {
        var iteminfo = {};
        iteminfo.query = this.query;
        iteminfo.title = $(el)
          .find(".a-color-base.a-text-normal")
          .text()
          .trim();
        if (iteminfo.title === "") return;
        // check repetition;
        try {
          this.itemList.forEach((element) => {
            if (
              element.title === iteminfo.title &&
              element.website === iteminfo.website
            ) {
              throw BreakException;
            }
          });
        } catch (e) {
          //repetition found
          return;
        }

        const price = (
          $(el).find(".a-price-whole").text() +
          $(el).find(".a-price-fraction").text()
        )
          .replace(".", "")
          .replace(",", ".");

        iteminfo.price = parseFloat(price);
        if (isNaN(parseFloat(price))) {
          return;
        }
        iteminfo.img = $(el).find("img.s-image").attr("src");
        iteminfo.link =
          "https://www.amazon.com.tr" +
          $(el).find("a.a-link-normal.a-text-normal")[0].attribs.href;
        iteminfo.website = "amazon";

        this.itemList.push(iteminfo);
      });
    };

    this.promise_func = (arr) => {
      let returnArr = [];
      if (arr.includes("n11")) {
        console.log("n11 init");

        const n11 = fetch("https://www.n11.com/arama?q=" + this.query)
          .then((res) => res.text())
          .then((res) => this.crawl_n11(res))
          .catch((err) => console.log(err))
          .then(() => console.log("finished n11"));
        returnArr.push(n11);
      }
      if (arr.includes("hepsiburada")) {
        console.log("hepsiburada init");
        const hepsiburada = fetch(
          `https://www.hepsiburada.com/ara?q=${this.query}`,
          {
            headers: {
              Connection: "keep-alive",
              "Cache-Control": "max-age=0",
              DNT: "1",
              "Upgrade-Insecure-Requests": "1",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "Sec-Fetch-Site": "none",
              "Sec-Fetch-Mode": "navigate",
              "Sec-Fetch-User": "?1",
              "Sec-Fetch-Dest": "document",
              "Accept-Language": "en-US,en;q=0.9,tr-TR;q=0.8,tr;q=0.7",
            },
          }
        )
          .then((res) => res.text())
          .then((res) => this.crawl_hepsiburada(res))
          .catch((err) => console.log(err))
          .then(() => console.log("finished hepsiburada"));

        returnArr.push(hepsiburada);
      }
      if (arr.includes("gittigidiyor")) {
        console.log("gittigidiyor init");
        const gittigidiyor = fetch(
          `https://www.gittigidiyor.com/arama/?k=${this.query}`
        )
          .then((res) => res.text())
          .then((res) => this.crawl_gittigidiyor(res))
          .catch((err) => console.log(err))
          .then(() => console.log("finished gittigidiyor"));
        returnArr.push(gittigidiyor);
      }
      if (arr.includes("amazon")) {
        console.log("amazon init");
        const amazon = fetch(`https://www.amazon.com.tr/s?k=${this.query}`)
          .then((res) => res.text())
          .then((res) => this.crawl_amazon(res))
          .catch((err) => console.log(err))
          .then(() => console.log("finished amazon"));
        returnArr.push(amazon);
      }
      return Promise.all(returnArr);
    };
  }
}
// var a = new Scrape("xiaomi redmi note 8");
// a.promise_func(["amazon"]).then((arr) =>
//   console.log(a.itemList, a.itemList.length)
// );
module.exports = Scrape;
