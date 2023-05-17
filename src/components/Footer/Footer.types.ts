/**
 * @file This file defines the types and interfaces required for the Footer component.
 * It includes definitions for the structure of footer links, footer icons, and the
 * Footer component's props.
 * */

// Import the StaticImageData type for static image data
import type { StaticImageData } from "next/image";

/**
 * @typedef FooterProps - The props for the Footer component.
 * @property {FooterLink[]} data - An array of footer links.
 * @property {string | StaticImageData} [logo] - Optional logo URL or image data.
 * @property {string} [description] - Optional footer description text.
 * @property {string} [copyright] - Optional copyright text.
 * @property {FooterIcon[]} [icons] - Optional array of footer icons.
 * @property {Object} [classes] - Optional custom class names for component elements.
 */
export type FooterProps = {
  data: FooterLink[];
  logo?: string | StaticImageData;
  description?: string;
  copyright?: string;
  icons?: FooterIcon[];
  classes?: {
    footer: string;
    logo: string;
    description: string;
    inner: string;
    groups: string;
    wrapper: string;
    link: string;
    title: string;
    afterFooter: string;
    social: string;
  };
};

/**
 * @typedef FooterLink - The structure of a footer link.
 * @property {string} title - The title of the footer link.
 * @property {{ label: string; link: string }[]} links - An array of footer link objects.
 * */

export type FooterLink = {
  title: string;
  links: { label: string; link: string }[];
};

/**
 * @typedef FooterIcon - The structure of a footer icon.
 * @property {JSX.Element} icon - The icon element.
 * @property {string} link - The URL of the footer icon.
 * */

export type FooterIcon = {
  icon: JSX.Element;
  link: string;
};
