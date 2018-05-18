import fs from 'fs'
import path from 'path'
import axios from 'axios'

const dataDir = `${__dirname}/fakeStackOverflowData`

let data = [];

fs
  .readdirSync(dataDir)
  .forEach(file => {
    if (file[0] === 'q') {
      data = data.concat(require(path.join(dataDir, file)));
    }
  });

console.log(data[0]);

const getBody = async () => {
  for (const question of body) {
    const html = await axios.get(question.link);
    
  }
}