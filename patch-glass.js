import fs from 'fs';
let css = fs.readFileSync('src/index.css', 'utf-8');
css = css.replace(/\.glass-panel \{[^}]+\}/m, `.glass-panel {\n    background-color: var(--bg-surface);\n    border: 1px solid var(--border-subtle);\n    backdrop-filter: blur(12px);\n    -webkit-backdrop-filter: blur(12px);\n  }`);
fs.writeFileSync('src/index.css', css);
