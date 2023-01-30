import captureWebsite from 'capture-website';
import { format } from 'date-fns'
import fs from 'fs'
import readline from 'readline'

const url = 'https://www.google.com/'
const dirScreenshot = format(new Date(), 'yyyy-MM-dd_HH-mm-ss')

const convertUrlToFileName = (url) => url.replace(/(:|\.|\/|\?|#)/g, '_')

export async function oneFile (url) {
  await captureWebsite.file(url, `${dirScreenshot}/capture-website_${convertUrlToFileName(url)}.png`, {
    delay: 3,
    fullPage: true,
    emulateDevice: 'iPhone X'
  });
}

export async function multiFile () {
  const fileStream = fs.createReadStream('url_list.txt');
  const reader = readline.createInterface({
    input: fileStream
  });
  const urlList = []
  for await (const line of reader) {
    urlList.push(line)
  }
  
  urlList.forEach(async (url) => {
    await captureWebsite.file(url, `${dirScreenshot}/capture-website_${convertUrlToFileName(url)}.png`, {
      delay: 3,
      fullPage: true,
      emulateDevice: 'iPhone X'
    });
  })
}