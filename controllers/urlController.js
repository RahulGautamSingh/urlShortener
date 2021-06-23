const Url = require("../models/url");
const { nanoid } = require("nanoid");

function generateShortUrl() {
  return nanoid(7);
}
const addNewUrl = async (url) => {
  let urlOne = await Url.findOne({ title: url }).catch((err) =>
    console.log(err)
  );

  if (urlOne === null) {
    let shortUrl = generateShortUrl();
    console.log(shortUrl);
    urlOne = new Url({ title: url, short_url: shortUrl });
    await urlOne.save();
    return urlOne.short_url;
  } else return urlOne.short_url;
};
const findUrl = async (shortUrl) => {
  let url = await Url.findOne({ short_url: shortUrl }); // result = await Category.findOne({name:categoryName}) -> result===undefined -> err
  if (url === null) return undefined;
  return url.title;
};

module.exports = {
  addNewUrl,
  findUrl,
};
