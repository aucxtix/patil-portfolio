const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replacements
  let updated = content
    .replace(/bg-\[#030303\]/g, 'bg-theme-base')
    .replace(/text-white/g, 'text-theme-text')
    .replace(/text-neutral-400/g, 'text-theme-muted')
    .replace(/text-neutral-500/g, 'text-theme-muted/70')
    .replace(/text-neutral-300/g, 'text-theme-muted')
    .replace(/bg-white\/\[0\.02\]/g, 'bg-theme-surface')
    .replace(/bg-white\/\[0\.03\]/g, 'bg-theme-surface')
    .replace(/border-white\/\[0\.05\]/g, 'border-theme-border')
    .replace(/border-white\/\[0\.02\]/g, 'border-theme-border')
    .replace(/border-white\/\[0\.1\]/g, 'border-theme-border-strong')
    .replace(/border-white\/\[0\.2\]/g, 'border-theme-border-strong')
    .replace(/border-neutral-900\/50/g, 'border-theme-border')
    .replace(/border-neutral-900/g, 'border-theme-border')
    .replace(/#00f0ff/g, 'var(--accent-cyan)')
    .replace(/#8a2be2/g, 'var(--accent-purple)')
    .replace(/#ff4500/g, 'var(--accent-orange)')
    .replace(/#06b6d4/g, 'var(--accent-cyan)')
    .replace(/#030303/g, 'var(--bg-base)');
    
  if (content !== updated) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log('Updated', file);
  }
});
