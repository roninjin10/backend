import fs from 'fs'
import path from 'path'
import axios from 'axios'
import cheerio from 'cheerio'

const dataDir = `${__dirname}/fakeStackOverflowData`

let data = [];

fs
  .readdirSync(dataDir)
  .forEach(file => {
    if (file[0] === 'q') {
      data = data.concat(require(path.join(dataDir, file)));
    }
  });

//console.log(data[0]);

const getBody = async () => {
  for (const question of data) {
    const res = await axios.get(question.link);
    const $ = cheerio.load(res.data);
    //console.log(question.link);
    //console.log( $('.post-text'));
    let text = [];
    $('.post-text').each(function(i, elem) {
      text[i] = $(this).text();
    });
    console.log(text);
    //break
  }
}

getBody();