import slugify from "slugify";

export function generateSlug(text: string): string {
  return (
    slugify(text, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    }) +
    "-" +
    Math.random().toString(36).substring(2, 4)
  );
}
