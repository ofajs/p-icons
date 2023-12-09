export default function myDestRewriter(svgName) {
  let fileName = svgName;
  fileName = fileName.replace(/_([0-9]+)px\.svg/, "").replace(/_/g, "-");

  return fileName;
}
