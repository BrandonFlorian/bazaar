import { MantineThemeOverride } from "@mantine/core";

export const lightTheme: MantineThemeOverride = {
  colorScheme: "light",
  dir: "ltr",
  primaryShade: {
    light: 6,
    dark: 8,
  },
  focusRing: "auto",
  loader: "oval",
  white: "#fff",
  black: "#000",
  defaultRadius: "sm",
  transitionTimingFunction: "ease",
  lineHeight: 1.55,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontFamilyMonospace:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  primaryColor: "red",
  respectReducedMotion: true,
  cursorType: "default",
  defaultGradient: {
    from: "red",
    to: "white",
    deg: 180,
  },
  shadows: {
    xs: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)",
    sm: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem",
    md: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.625rem 0.625rem -0.3125rem",
    lg: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.75rem 1.4375rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 0.75rem 0.75rem -0.4375rem",
    xl: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 2.25rem 1.75rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 1.0625rem 1.0625rem -0.4375rem",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "2rem",
  },
  spacing: {
    xs: "0.625rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },
  headings: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    fontWeight: 700,
    sizes: {
      h1: { fontSize: "2.125rem", lineHeight: 1.3, fontWeight: void 0 },
      h2: { fontSize: "1.625rem", lineHeight: 1.35, fontWeight: void 0 },
      h3: { fontSize: "1.375rem", lineHeight: 1.4, fontWeight: void 0 },
      h4: { fontSize: "1.125rem", lineHeight: 1.45, fontWeight: void 0 },
      h5: { fontSize: "1rem", lineHeight: 1.5, fontWeight: void 0 },
      h6: { fontSize: "0.875rem", lineHeight: 1.5, fontWeight: void 0 },
    },
  },
  other: {},
  components: {
    Button: {
      defaultProps: {
        color: "red",
        size: "md",
        radius: "sm",
        variant: "filled",
        fullWidth: false,
        unstyled: false,
      },
    },
    Checkbox: {
      defaultProps: {
        color: "black",
        cursor: "pointer",
        size: "xl",
      },
    },
    Switch: {
      defaultProps: {
        color: "red",
        size: "md",
      },
    },
    ActionIcon: {
      defaultProps: {
        variant: "subtle",
        color: "red",
      },
      styles(theme, params, context) {
        return {
          root: {},
          icon: {},
        };
      },
    },
    Avatar: {
      defaultProps: {
        radius: "xl",
      },
      styles(theme, params, context) {
        return {
          root: {},
          image: {},
          placeholder: {},
        };
      },
    },
  },
  activeStyles: { transform: "translateY(0.0625rem)" },
  datesLocale: "en",
  globalStyles: (theme) => ({
    body: {},
  }),

  focusRingStyles: {
    styles: (theme) => ({
      outlineOffset: "0.125rem",
      outline: `0.125rem solid ${
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5]
      }`,
    }),
    resetStyles: () => ({ outline: "none" }),
    inputStyles: (theme) => ({
      outline: "none",
      borderColor:
        theme.colors[theme.primaryColor][
          typeof theme.primaryShade === "object"
            ? theme.primaryShade[theme.colorScheme]
            : theme.primaryShade
        ],
    }),
  },
};
export default lightTheme;
