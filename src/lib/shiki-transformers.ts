import type { ShikiTransformer } from "shiki";

export function transformerLanguageIndicator(): ShikiTransformer {
  return {
    name: "language-indicator",
    code(node) {
      const lang = this.options.lang;
      if (lang) {
        node.properties["data-language"] = lang;
      }
    },
  };
}
