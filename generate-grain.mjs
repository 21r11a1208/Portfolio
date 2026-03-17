// Run with: node generate-grain.mjs
// Generates a 200x200 noise PNG for the grain overlay
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

const size = 200;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');
const imageData = ctx.createImageData(size, size);

for (let i = 0; i < imageData.data.length; i += 4) {
  const v = Math.floor(Math.random() * 255);
  imageData.data[i] = v;
  imageData.data[i + 1] = v;
  imageData.data[i + 2] = v;
  imageData.data[i + 3] = 255;
}

ctx.putImageData(imageData, 0, 0);
writeFileSync('./public/grain.png', canvas.toBuffer('image/png'));
console.log('grain.png generated');
