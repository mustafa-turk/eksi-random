const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (_, res) => {
  const response = await axios('https://eksisozluk.com');
  res.json(extractFirstEntry(response.data));
}

function extractFirstEntry(html) {
  const $ = cheerio.load(html);
  return {
    title: $('#topic > #title').first().text(),
    slug: $('#topic > #title > a').first().attr('href'),
    body: $('#topic > #entry-item-list > li > .content').first().text(),
    date: $('#topic > #entry-item-list > li > footer > .info > .entry-date').first().text(),
    author: $('#topic > #entry-item-list > li > footer > .info > .entry-author').first().text()
  };
};