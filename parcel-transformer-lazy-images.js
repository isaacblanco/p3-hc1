const { Transformer } = require("@parcel/plugin");
const path = require("path");

module.exports = new Transformer({
  async transform({ asset }) {
    let code = await asset.getCode();
    const dataSrcRegex = /data-src\s*=\s*["']([^"']+)["']/g;
    const dataSrcsetRegex = /data-srcset\s*=\s*["']([^"']+)["']/g;

    let match;
    while ((match = dataSrcRegex.exec(code)) !== null) {
      let imgPath = match[1];
      asset.addURLDependency(imgPath, { priority: "lazy" });
    }

    while ((match = dataSrcsetRegex.exec(code)) !== null) {
      let srcset = match[1];
      srcset.split(",").forEach((src) => {
        let [url] = src.trim().split(" ");
        asset.addURLDependency(url, { priority: "lazy" });
      });
    }

    return [asset];
  },
});
