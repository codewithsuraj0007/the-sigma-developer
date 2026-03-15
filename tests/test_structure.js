const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, '../frontend', 'index.html');
const html = fs.readFileSync(htmlFilePath, 'utf8');

console.log("--- Phase 1: Structure Test ---");

// 1. Check duplicate IDs
const idMatches = html.matchAll(/id=["']([^"']+)["']/g);
const ids = [];
const duplicates = new Set();
for (const match of idMatches) {
    const id = match[1];
    if (ids.includes(id)) {
        duplicates.add(id);
    } else {
        ids.push(id);
    }
}
if (duplicates.size > 0) {
    console.error("❌ Duplicate IDs found:", Array.from(duplicates));
} else {
    console.log("✅ No duplicate IDs found.");
}

// 2. Missing alt on imgs
const imgMatches = html.matchAll(/<img([^>]+)>/g);
let missingAlt = 0;
for (const match of imgMatches) {
    if (!match[1].includes('alt=')) {
        missingAlt++;
    }
}
if (missingAlt > 0) {
    console.warn(`⚠️ Found ${missingAlt} <img> tags missing 'alt' attributes.`);
} else {
    console.log("✅ All <img> tags have 'alt' attributes.");
}

// 3. Proper semantic tags check
const semanticTags = ['header', 'main', 'section', 'footer'];
semanticTags.forEach(tag => {
    const hasTag = new RegExp(`<${tag}[>\\s]`).test(html);
    if (hasTag) {
        console.log(`✅ Uses <${tag}> tag.`);
    } else {
        console.warn(`⚠️ Missing <${tag}> tag.`);
    }
});
