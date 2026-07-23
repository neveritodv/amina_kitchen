const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'c:/Users/Administrator/Desktop/amina kitchen/images/logo.png';
const outputPath = 'c:/Users/Administrator/Desktop/amina kitchen/amina-kitchen/src/assets/images/logo.png';
const publicPath = 'c:/Users/Administrator/Desktop/amina kitchen/amina-kitchen/public/images/logo.png';
const favIconPath = 'c:/Users/Administrator/Desktop/amina kitchen/amina-kitchen/public/images/fav ico.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Analyzing image ${this.width}x${this.height}`);

    let totalRemoved = 0;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // Check if color is part of the white/grey/checkerboard background
        // Checkerboard boxes have high brightness (> 170) and low saturation
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;

        // Background pixels have low color difference (neutral grey/white) and high luminance
        const isNeutral = diff < 25;
        const isBrightNeutral = isNeutral && (r > 160 && g > 160 && b > 160);
        
        // Edge anti-aliasing check: fade near-white/grey pixels smoothly
        const isSemiBrightNeutral = isNeutral && (r > 130 && g > 130 && b > 130);

        if (isBrightNeutral) {
          this.data[idx + 3] = 0; // Fully transparent
          totalRemoved++;
        } else if (isSemiBrightNeutral) {
          // Calculate distance to pure gold or dark green
          // Gold pixels typically have r > 150, g > 110, b < 100
          const isGoldOrGreen = (g > b + 20) || (r > b + 30) || (g > 60 && b < 60);
          if (!isGoldOrGreen) {
            // Anti-alias edge
            this.data[idx + 3] = Math.max(0, Math.floor((255 - r) * 1.5));
            totalRemoved++;
          }
        }
      }
    }

    console.log(`Cleaned image! Total background/artifact pixels transparentized: ${totalRemoved}`);

    const buffer = PNG.sync.write(this);
    fs.writeFileSync(outputPath, buffer);
    fs.writeFileSync(publicPath, buffer);
    fs.writeFileSync(favIconPath, buffer);
    console.log('Saved 100% transparent PNG to assets and public!');
  });
