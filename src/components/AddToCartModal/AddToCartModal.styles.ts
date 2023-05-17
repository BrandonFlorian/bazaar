import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  textItems: {
    textAlign: "center",
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
    marginTop: 20,
  },
  image: {
    objectFit: "contain",
    marginTop: 20,
    borderRadius: theme.radius.md,
    transition: "box-shadow 0.2s ease, transform 0.2s ease",
    boxShadow: `0 0 ${theme.spacing.xs} ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
    }`, // Add glow effect
    "&:hover": {
      boxShadow: `0 0 ${theme.spacing.xl} ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[5]
      }`, // Increase glow effect on hover
      transform: "scale(1.1)",
    },
  },
}));
