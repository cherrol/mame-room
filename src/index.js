const path = require('path');
const ProgressBar = require('progress');
const { exec } = require('child_process');
const roomUrls = require('../mame-room-urls.json');

let timer = null;
let step = 50;
let index = 0;
let total = roomUrls.length;
let destDir = './room-pack';
let bar = new ProgressBar('Done [:bar] :percent | :current / :total', {
  total: total,
  complete: '=',
  incomplete: ' ',
  width: 30,
});

/**
 * @step      Running interval
 * @destDir   Where to save the file
 */
const conf = {
  step: 50,
  destdir: ''
}

timer = setInterval(() => {
  let roomUrl = roomUrls[index];
  let filepath = path.join(destDir, path.basename(roomUrl));
  index++;

  let bat = exec(`curl ${roomUrl} >> ${filepath} -L`);

  bat.on('exit', () => {
    bar.tick();
  });

  if (index >= total) {
    setTimeout(() => {
      clearInterval(timer);
    }, step)
  }
}, step);
