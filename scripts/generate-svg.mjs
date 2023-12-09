import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import myDestRewriter from "./rename.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgDirname = path.join(__dirname, "../material-icons");
const componentDirname = path.join(__dirname, "../lib");


function generateJSON(svgFiles) {
  const fileNames = svgFiles.map((file) => ({
    name: myDestRewriter(file),
  }));
  const result = {
    total: svgFiles.length,
    fileNames: fileNames,
  };
  const jsonResult = JSON.stringify(result, null, 2);
  const filePath = path.join(componentDirname, "svg-files.json");

  fs.writeFileSync(filePath, jsonResult, "utf8");

  console.log(`Generated ${filePath}`);
}

function cleanSvgPath(svgContent) {
  const processedSvg = svgContent.replace(/<path[^>]*fill="none"[^>]*>/g, "");
  const finalSvg = processedSvg.replace(/<path/g, '<path fill="currentColor"');
  return finalSvg;
}

// Get all SVG files in the target file
const svgFiles = fs
  .readdirSync(svgDirname)
  .filter((file) => path.extname(file) === ".svg");


svgFiles.forEach((svgFile) => {
  const svgFilePath = path.join(svgDirname, svgFile);
  const convertedName = myDestRewriter(svgFile);
  const svgContent = fs.readFileSync(svgFilePath, "utf8");
  const finalSvg = cleanSvgPath(svgContent);

  const fileName = `${convertedName}.svg`;
  const filePath = path.join(componentDirname, fileName);

  fs.writeFileSync(filePath, finalSvg, "utf8");

  console.log(`Generated ${fileName}`);
});

generateJSON(svgFiles);
