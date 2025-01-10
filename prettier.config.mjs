/** @type {import("prettier").Config} */
export default {
  importOrder: ["^react(:.+|/.+)?$", "<THIRD_PARTY_MODULES>", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  printWidth: 120,
  semi: false,
}
