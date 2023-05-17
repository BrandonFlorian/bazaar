/**
 * @file The Footer component is a functional component that renders the footer
 * section of a web page. It includes the logo, description, link groups, copyright
 * text, and social icons. This component relies on the FooterProps type for the
 * structure of its props, and it uses the useStyles hook for styling.
 *
 * @component Footer - The Footer component.
 * @param {FooterProps} props - The props for the Footer component, including data,
 * @param {FooterLinkGroup[]} props.data - The array of link groups.
 * @param {string} props.logo - The path to the logo image.
 * @param {string} props.description - The description text.
 * @param {string} props.copyright - The copyright text.
 * @param {FooterIcon[]} props.icons - The array of social icons.
 * @param {string} [props.classes] - Optional custom classes to override the default classes.
 * @returns {JSX.Element} - The Footer component.
 * logo, description, copyright, icons, and classes.
 *
 * @dependencies
 * - React
 * - FooterProps from './types'
 * - Text, Container, ActionIcon, Group from '@mantine/core'
 * - useStyles from './styles'
 * - Image from 'next/image'
 *
 * @example
 * // In your parent component where you want to render the Footer:
 * import Footer from './Footer';
 *
 * const data = [ ... ]; // The data array for link groups
 * const icons = [ ... ]; // The social icons array
 * const logo = '/path/to/logo.png';
 * const description = 'Your description text';
 * const copyright = 'Copyright text';
 *
 * return (
 *   <>
 *     // ... Other components ...
 *     <Footer
 *       data={data}
 *       logo={logo}
 *       description={description}
 *       copyright={copyright}
 *       icons={icons}
 *     />
 *   </>
 * );
 */

import React, { FC } from "react";
import { FooterProps } from "./Footer.types";
import { Text, Container, ActionIcon, Group } from "@mantine/core";
import { useStyles } from "./Footer.styles";
import Image from "next/image";
import Link from "next/link";

export const Footer: FC<FooterProps> = (props: FooterProps) => {
  const { classes } = useStyles();

  const groups = props.data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={props.classes?.link ? props.classes.link : classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div
        className={
          props.classes?.wrapper ? props.classes.wrapper : classes.wrapper
        }
        key={group.title}
      >
        <Text
          className={props.classes?.title ? props.classes.title : classes.title}
        >
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  const icons = props.icons
    ? props.icons.map((icon, index) => (
        <Link
          key={index}
          href={icon.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ActionIcon key={index} size="lg">
            {icon.icon}
          </ActionIcon>
        </Link>
      ))
    : [];

  return (
    <footer
      className={props.classes?.footer ? props.classes?.footer : classes.footer}
    >
      <Container
        className={props.classes?.inner ? props.classes.inner : classes.inner}
      >
        <div
          className={props.classes?.logo ? props.classes.logo : classes.logo}
        >
          {props.logo && (
            <Image
              src={props.logo}
              alt="logo"
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
            />
          )}

          <Text
            size="xs"
            color="dimmed"
            className={
              props.classes?.description
                ? props.classes.description
                : classes.description
            }
          >
            {props.description}
          </Text>
        </div>
        <div
          className={
            props.classes?.groups ? props.classes.groups : classes.groups
          }
        >
          {groups}
        </div>
      </Container>
      <Container
        className={
          props.classes?.afterFooter
            ? props.classes.afterFooter
            : classes.afterFooter
        }
      >
        <Text color="dimmed" size="sm">
          {props.copyright}
        </Text>

        <Group
          spacing={0}
          className={
            props.classes?.social ? props.classes.social : classes.social
          }
          position="right"
          noWrap
        >
          {icons}
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
