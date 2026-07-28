const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'src', 'assets', 'images', 'games');
const outFile  = path.join(__dirname, 'src', 'assets', 'data', 'games.json');

const allowedExt = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'];

const files = fs.readdirSync(gamesDir)
  .filter(f => allowedExt.includes(path.extname(f).toLowerCase()))
  .sort();

const games = files.map((file, i) => {
  const name = path.basename(file, path.extname(file))
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return {
    id: i + 1,
    name,
    image: `assets/images/games/${file}`
  };
});

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(games, null, 2));

console.log(`✅ ${games.length} juegos generados:`);
games.forEach(g => console.log(`   - ${g.name} (${g.image})`));
