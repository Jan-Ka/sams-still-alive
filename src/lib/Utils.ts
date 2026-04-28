/**
 * @see https://www.30secondsofcode.org/js/s/slugify
 */
export function slugify (str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
