import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  cardSection: {},
  card: {
    background: "rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: theme.radius.md,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: `0 0 ${theme.spacing.md} ${
      theme.colorScheme === "dark" ? theme.colors.blue[3] : theme.colors.gray[5]
    }`, // glow effect
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: `0 0 ${theme.spacing.xl} ${
        theme.colorScheme === "dark"
          ? theme.colors.blue[3]
          : theme.colors.gray[5]
      }`, // Increase glow effect on hover
    },
  },
  productTitle: {},
  productPrice: {},
  productDescription: {},
  productImage: {
    borderRadius: theme.radius.md,
    boxShadow: `0 0 ${theme.spacing.xs} ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
    }`, // Add glow effect
    transition: "box-shadow 0.2s ease, transform 0.2s ease",
    "&:hover": {
      boxShadow: `0 0 ${theme.spacing.xl} ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[5]
      }`, // Increase glow effect on hover
      transform: "scale(1.1)",
    },
  },
  button: {},
}));
