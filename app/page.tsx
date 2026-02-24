"use client"

import ExampleBoard from "@/components/ExampleBoard";
import SiteBadge from "@/components/SiteBadge";
import { Container, Title, Button, Text, Badge, Card, Flex, SimpleGrid, Grid, Image, Center, useMantineTheme, Box, ThemeIcon } from "@mantine/core"
import { IconChevronRight, IconRocket, IconTicTac } from "@tabler/icons-react";
import Link from "next/link"

export default function Home() {
  const theme = useMantineTheme();

  return (
    <>
      <Box
        style={{
          background: `
            radial-gradient(ellipse 110% 70% at 25% 80%, rgba(255, 20, 147, 0.15), transparent 55%),
            radial-gradient(ellipse 130% 60% at 75% 15%, rgba(0, 255, 255, 0.12), transparent 65%),
            radial-gradient(ellipse 80% 90% at 20% 30%, rgba(138, 43, 226, 0.18), transparent 50%),
            radial-gradient(ellipse 100% 40% at 60% 70%, rgba(16, 185, 129, 0.08), transparent 45%),
            transparent
        `,
        }}
        py="xl"
      >
        <Container size="lg" py="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <SiteBadge text="#Ta-Te-Ti-Uy" />

              <Title mb="lg" fw={900} style={{ fontSize: "5rem", lineHeight: 1.1 }}>
                El Ta-Te-Ti más {' '}
                <Text
                  component="div"
                  inherit
                  variant="gradient"
                  gradient={{ from: 'grape', to: 'cyan' }}
                >
                  Competitivo
                </Text>{' '}
                del Uruguay
              </Title>

              <Text size="lg" mb="lg">
                Play Tic-Tac-Toe online with friends or random opponents. Compete in tournaments, climb the leaderboards, and prove you're the best.
              </Text>

              <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >

                <Link href="/login">
                  <Button
                    radius="xl"
                    variant="filled"
                    color="grape"
                    size="xl"
                    leftSection={<IconRocket size={25} />}
                  >
                    Jugar Ahora
                  </Button>
                </Link>
                <Link href="/como-jugar">
                  <Button
                    radius="xl"
                    variant="default"
                    size="xl"
                    rightSection={<IconChevronRight size={25} />}
                  >
                    Cómo Jugar?
                  </Button>
                </Link>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Center h="100%">
                <ExampleBoard />
              </Center>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
      <section>
        <Container size="lg" py="xl">
          <Title order={2} size="h1" ta="center" mb="xl">
            Master the Ultimate Grid.
          </Title>
          <SimpleGrid cols={{ base: 1, md: 3 }}>
            <Card withBorder p="xl" radius="md" shadow="sm">

              <ThemeIcon variant="light" size="xl" color="cyan" mb="md">
                <IconTicTac size={35} stroke={1.5} />
              </ThemeIcon>

              <Title order={3} size="h2">
                Real-time Multiplayer
              </Title>
              <Text>Latency-free global matchmaking. Connect with players from Tokyo to New York in milliseconds.</Text>
            </Card>

            <Card withBorder p="xl" radius="md" shadow="sm">

              <ThemeIcon variant="light" size="xl" color="grape" mb="md">
                <IconTicTac size={35} stroke={1.5} />
              </ThemeIcon>

              <Title order={3} size="h2">
                Real-time Multiplayer
              </Title>
              <Text>Latency-free global matchmaking. Connect with players from Tokyo to New York in milliseconds.</Text>
            </Card>

            <Card withBorder p="xl" radius="md" shadow="sm">

              <ThemeIcon variant="light" size="xl" color="pink" mb="md">
                <IconTicTac size={35} stroke={1.5} />
              </ThemeIcon>

              <Title order={3} size="h2">
                Real-time Multiplayer
              </Title>
              <Text>Latency-free global matchmaking. Connect with players from Tokyo to New York in milliseconds.</Text>
            </Card>
          </SimpleGrid>
        </Container>
      </section>
      <section>
        <Container size="lg" py="xl">
          <Card
            withBorder
            p="xl"
            radius="md"
            shadow="sm"
            bg="var(--mantine-color-grape-5)"
          >
            <Title order={2} size="h1" ta="center" mb="xl" c="white" tt="uppercase">
              Master the Ultimate Grid.
            </Title>
            <Text size="lg" ta="center" mb="lg" c="white">
              Create your account in seconds and claim your unique username before someone else does.
            </Text>
            <Center>
              <Link href="/login">
                <Button
                  radius="xl"
                  variant="white"
                  color="grape"
                  size="xl"
                  leftSection={<IconRocket size={25} />}
                >
                  Jugar Ahora
                </Button>
              </Link>
            </Center>
          </Card>
        </Container>
      </section>
    </>
  )
}
