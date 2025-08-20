import socialLinks from '../config/social-links.json';
import { SocialLinks } from '../types/social';

/**
 * Retrieves all social media links and contact information
 * @returns {SocialLinks} Object containing all configured social links
 * @example
 * const links = getSocialLinks();
 * console.log(links.github.url); // "https://github.com/username"
 */
export function getSocialLinks(): SocialLinks {
  return socialLinks;
}

/**
 * Retrieves a specific social link by key
 * @param {string} key - The social platform key (e.g., 'github', 'linkedin')
 * @returns {SocialLink | undefined} The social link object or undefined if not found
 * @example
 * const githubLink = getSocialLink('github');
 * if (githubLink) {
 *   console.log(githubLink.url); // "https://github.com/username"
 * }
 */
export function getSocialLink(key: string) {
  return socialLinks[key as keyof typeof socialLinks];
}