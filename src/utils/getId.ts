/**
 * Generates a unique identifier for a tooltip.
 *
 * @returns A string in the format `tooltip-<randomString>`, where `<randomString>`
 * is a randomly generated alphanumeric string of 7 characters.
 */
export function getId() {
  return `tooltip-${Math.random().toString(36).slice(2, 9)}`;
}
