import fs from 'fs';
let css = fs.readFileSync('src/index.css', 'utf-8');

// Ensure text-primary contrast is good
css = css.replace(/--text-primary: #E6EDF3;/, '--text-primary: #F0F6FC;');
css = css.replace(/--text-primary: #0A0E14;/, '--text-primary: #000000;');

fs.writeFileSync('src/index.css', css);
