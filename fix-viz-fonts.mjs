import fs from 'fs';
let content = fs.readFileSync('C:\\Users\\asamoah\\information-is-beautiful\\src\\components\\VizRenderers.tsx', 'utf8');
content = content.replace(/fontSize="9\.5"/g, 'fontSize="11"');
content = content.replace(/fontSize="10"/g, 'fontSize="12"');
content = content.replace(/fontSize="8\.5"/g, 'fontSize="11"');
content = content.replace(/fontSize="9"/g, 'fontSize="11"');
fs.writeFileSync('C:\\Users\\asamoah\\information-is-beautiful\\src\\components\\VizRenderers.tsx', content);
console.log('Done');