import { Container, Title, Text, Button } from "@mantine/core";
import { useStyles } from "./Hero.styles";
import { type FC } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "@/utils/motion";
type Props = {};

export const Hero: FC<Props> = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <motion.div
              variants={staggerContainer(2, 4)}
              initial="hidden"
              whileInView={"show"}
            >
              <motion.div variants={fadeIn("right", "tween", 0, 1)}>
                <Title className={classes.title}>
                  A{" "}
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: "yellow", to: "green" }}
                  >
                    fully featured{" "}
                  </Text>
                  Digital Marketplace
                </Title>
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeIn("up", "tween", 0, 1)}
              initial="hidden"
              whileInView={"show"}
            >
              <Text className={classes.description} mt={30}>
                Build a fully functional accessible marketplaces with ease
              </Text>

              <Button
                variant="gradient"
                gradient={{ from: "yellow", to: "green" }}
                size="xl"
                className={classes.control}
                mt={40}
              >
                Get started
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
