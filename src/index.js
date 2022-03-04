const path = require('path');
const ProgressBar = require('progress');
const { exec } = require('child_process');
// const roomUrls = require('../mame-room-urls.json');

let roomUrls = [
  "https://archive.org/download/mame-merged/mame-merged/005.zip",
  "https://archive.org/download/mame-merged/mame-merged/100lions.zip",
  "https://archive.org/download/mame-merged/mame-merged/10yard.zip",
  "https://archive.org/download/mame-merged/mame-merged/110dance.zip",
  "https://archive.org/download/mame-merged/mame-merged/11beat.zip",
  "https://archive.org/download/mame-merged/mame-merged/15lions.zip",
  "https://archive.org/download/mame-merged/mame-merged/18w.zip",
  "https://archive.org/download/mame-merged/mame-merged/18wheelr.zip",
  "https://archive.org/download/mame-merged/mame-merged/1941.zip",
  "https://archive.org/download/mame-merged/mame-merged/1942.zip",
  "https://archive.org/download/mame-merged/mame-merged/1943.zip",
  "https://archive.org/download/mame-merged/mame-merged/1943kai.zip",
  "https://archive.org/download/mame-merged/mame-merged/1943mii.zip",
  "https://archive.org/download/mame-merged/mame-merged/1944.zip",
  "https://archive.org/download/mame-merged/mame-merged/1945kiii.zip",
]
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
