import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
let pdfMain = require('pdf-parse');
const pdf = pdfMain.default || pdfMain;

const dataBuffer = fs.readFileSync('../doc.pdf');

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('../doc_text.txt', data.text);
    console.log("PDF parsed successfully.");
}).catch(function (err) {
    console.error("Error parsing PDF:", err);
});
