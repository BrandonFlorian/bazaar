import { Container, Title, Text, Button } from "@mantine/core";
import { useStyles } from "./Hero.styles";
import { type FC } from "react";
type Props = {};

export const Hero: FC<Props> = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
              >
                fully featured
              </Text>{" "}
              Digital Bazaar
            </Title>

            <Text className={classes.description} mt={30}>
              Build a fully functional accessible marketplaces with ease
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
