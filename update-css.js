const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

// Update --bg-surface to be more opaque
css = css.replace(/--bg-surface: rgba\(230, 237, 243, 0\.02\);/, '--bg-surface: rgba(10, 14, 20, 0.65); /* dark mode */\n    --bg-surface-glass: rgba(10, 14, 20, 0.65);');
css = css.replace(/--bg-surface: rgba\(10, 14, 20, 0\.03\);/, '--bg-surface: rgba(255, 255, 255, 0.75); /* light mode */\n    --bg-surface-glass: rgba(255, 255, 255, 0.75);');

// Update text-muted for better contrast
css = css.replace(/--text-muted: #8B949E;/, '--text-muted: #A1B0C0;');
css = css.replace(/--text-muted: #57606A;/, '--text-muted: #424A53;');

// Update glass-panel to have backdrop blur
css = css.replace(/\.glass-panel \{[^}]+\}/m, `.glass-panel {\n    background-color: var(--bg-surface);\n    border: 1px solid var(--border-subtle);\n    backdrop-filter: blur(12px);\n    -webkit-backdrop-filter: blur(12px);\n  }`);

fs.writeFileSync('src/index.css', css);
