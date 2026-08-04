const fs = require('fs');

const content = fs.readFileSync('src/data/physicsData.ts', 'utf-8');

const updated = content.replace(/driveId:\s*"([^"]+)"/g, (match, id) => {
  if (!id) return match;
  // Check if it's already obfuscated (our obfuscated strings don't have - or _ usually, they are base64)
  // Let's just always obfuscate for now. Wait, if it's already obfuscated, it might get double obfuscated.
  // Original IDs are 33 chars long and start with '1' usually.
  if (id.length !== 33) return match; // skip if already obfuscated
  const obf = Buffer.from(id.split('').reverse().join('')).toString('base64');
  return `driveId: "${obf}"`;
});

fs.writeFileSync('src/data/physicsData.ts', updated, 'utf-8');
console.log('Obfuscated IDs!');
