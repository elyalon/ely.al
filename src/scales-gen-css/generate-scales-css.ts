import * as fs from "fs";
import * as path from "path";
import neutralScale from "../scales/elyal-neutral.json" with { type: "json" };
import primaryScale from "../scales/elyal-primary.json" with { type: "json" };

const outputFilePath = path.resolve(import.meta.dirname, "./scales.css");

let cssText = (
  [
    [neutralScale, "n"],
    [primaryScale, "p"],
  ] as const
)
  .map(([scale, prefix]) =>
    scale.scale.samples
      .map(
        (sample, i) =>
          `--${prefix}${i.toString().padStart(2, "0")}: ${sample.hex};`,
      )
      .join("\n"),
  )
  .join("\n");

cssText = `@theme {
${cssText}
}`;

fs.writeFileSync(outputFilePath, cssText, "utf-8");
