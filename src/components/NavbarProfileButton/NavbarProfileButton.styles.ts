import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },
}));
