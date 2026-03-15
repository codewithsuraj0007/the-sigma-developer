const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, '../frontend');
const indexHtmlPath = path.join(frontendDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
    console.error("index.html not found in frontend directory.");
    process.exit(1);
}

const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

// Regex to find href and src attributes
const linkRegex = /(?:href|src)=["']([^"']+)["']/g;

let match;
const links = [];

while ((match = linkRegex.exec(htmlContent)) !== null) {
    links.push(match[1]);
}

const defects = [];

// Filter local links and check if they exist
links.forEach(link => {
    // Ignore external links, mailto, tel, absolute URLs, anchors, and data URLs
    if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('//') || link.startsWith('#') || link.startsWith('data:')) {
        return;
    }

    // Strip out query params and hashes for file checking
    const cleanLink = link.split('?')[0].split('#')[0];
    
    // For root-relative links like /favicon.ico, we check against frontendDir
    const isRootRelative = cleanLink.startsWith('/');
    const targetPath = isRootRelative ? path.join(frontendDir, cleanLink) : path.join(frontendDir, cleanLink);

    if (!fs.existsSync(targetPath)) {
        defects.push(`Broken link found: ${link} (resolved path: ${targetPath})`);
    }
});

if (defects.length > 0) {
    console.log("Defects found!");
    defects.forEach(d => console.log(d));
    fs.writeFileSync('link_defects.txt', defects.join('\n'));
} else {
    console.log("No broken internal links found in index.html.");
}
