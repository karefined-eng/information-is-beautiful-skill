import fs from 'fs';
const files = ['Hero','Atlas','GetBook','TheBook','Playground','Author','AgentSkill','About','Privacy','Footer','Nav','Marquee','SectionHead','VizRenderers'];

files.forEach(f => {
  const path = 'C:\\Users\\asamoah\\information-is-beautiful\\src\\components\\' + f + '.tsx';
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/\u2014/g, '\u2013');
    fs.writeFileSync(path, content);
    console.log('Fixed ' + f);
  }
});