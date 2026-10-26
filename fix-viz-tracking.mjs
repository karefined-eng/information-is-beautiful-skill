import fs from 'fs';
let content = fs.readFileSync('C:\\Users\\asamoah\\information-is-beautiful\\src\\components\\VizRenderers.tsx', 'utf8');
content = content.replace(/letterSpacing="1\.5"/g, 'letterSpacing="0.5"');
content = content.replace(/letterSpacing="2\.5"/g, 'letterSpacing="0.5"');
content = content.replace(/letterSpacing="3"/g, 'letterSpacing="0.5"');
fs.writeFileSync('C:\\Users\\asamoah\\information-is-beautiful\\src\\components\\VizRenderers.tsx', content);
console.log('Done');