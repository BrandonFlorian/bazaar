import { createStyles, rem, getStylesRef, keyframes } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const glow = keyframes({
    "0%": {
      boxShadow: `0 0 ${theme.spacing.xs} ${theme.colors.gray[5]}`,
    },
    "25%": {
      boxShadow: `0 0 ${theme.spacing.xl} ${theme.colors.blue[4]}`,
    },
    "50%": {
      boxShadow: `0 0 ${theme.spacing.xxl} ${theme.colors.green[5]}`,
    },
    "75%": {
      boxShadow: `0 0 ${theme.spacing.xl} ${theme.colors.red[4]}`,
    },
    "100%": {
      boxShadow: `0 0 ${theme.spacing.xs} ${theme.colors.gray[5]}`,
    },
  });

  return {
    card: {
      height: 425,
      width: 400,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      transition: "all 0.2s ease",
      "&:hover": {
        transform: "scale(1.05)",
        transformOrigin: "center",
        borderColor: theme.colors.pink[9],
      },
      [`&:hover .${getStylesRef("image")}`]: {
        boxShadow: `0 0 ${theme.spacing.xl} ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[3]
            : theme.colors.gray[5]
        }`, // Increase glow effect on hover
        transform: "scale(1.1)",
        animation: `${glow} 1.5s infinite ease-in-out`,
      },
    },
    image: {
      objectFit: "contain",
      borderRadius: theme.radius.md,
      transition: "box-shadow 0.2s ease, transform 0.2s ease",
      boxShadow: `0 0 ${theme.spacing.xs} ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[5]
      }`, // Add glow effect
      ref: getStylesRef("image"),
    },
    title: {
      //textAlign: "center",
      fontSize: theme.fontSizes.xl,
      fontWeight: 500,
    },
    description: {
      textAlign: "center",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
    },
    price: {
      fontWeight: 700,
      fontSize: theme.fontSizes.xl,
      lineHeight: 1,
    },
    button: {
      borderRadius: theme.radius.xl,
      flex: 1,
    },
    section: {
      padding: theme.spacing.md,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
    label: {},
    imageSection: {
      padding: theme.spacing.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
    priceGroup: {},
    //end
  };
});
