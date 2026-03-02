"use client"

import ExampleBoard from "@/components/ExampleBoard";
import SiteBadge from "@/components/SiteBadge";
import { Title, Button, Text, Card, Flex, SimpleGrid, Grid, Center, Box, ThemeIcon, Transition, Avatar, Notification, Accordion, Stack, Container } from "@mantine/core"
import { IconBrain, IconBrandInstagram, IconChevronRight, IconLoader3, IconMedal2, IconPlus, IconRocket, IconShare3, IconWorld } from "@tabler/icons-react";
import Link from "next/link"
import { useWindowScroll, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from './Homepage.module.css';
import { SiteSection } from "@/components/SiteSection";
import Ads from "@/components/Ads";

const cards = [
  {
    title: "Juega en tiempo real",
    description: "Enfrentate con amigos o jugadores de todo el país en partidas rápidas y dinámicas.",
    icon: <IconWorld size={35} stroke={1.5} />,
    color: "cyan",
  },
  {
    title: "Competí por ser el mejor",
    description: "Sumá puntos, subí en el ranking y demostrá que sos el mejor jugador de Ta-Te-Ti del Uruguay.",
    icon: <IconMedal2 size={35} stroke={1.5} />,
    color: "grape",
  },
  {
    title: "Totalmente gratis",
    description: "No hay nada que pagar, todo es gratuito, solo monetizamos con la publicidad.",
    icon: <IconLoader3 size={35} stroke={1.5} />,
    color: "pink",
  },
  // {
  //   title: "Personalizá tu experiencia",
  //   description: "Elige tu avatar entre varios disponibles!",
  //   icon: <IconPalette size={35} stroke={1.5} />,
  //   color: "pink",
  // },
];

const faqs = [
  {
    title: "¿Cómo funciona?",
    description: "Juega en tiempo real con tus amigos o jugadores de todo el país.",
  },
  {
    title: "¿Hay que pagar algo?",
    description: "No, todo es gratuito, solo monetizamos con la publicidad.",
  },
];

export default function Home() {
  const [scroll] = useWindowScroll();
  const isDesktop = useMediaQuery('(min-width: 64em)');
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const shouldMountHero = isDesktop
    ? mounted && scroll.y === 0
    : true;

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
    const timer = setTimeout(() => setShowNotifications(true), 800);
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(timer);
    };
  }, []);

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
        <SiteSection>
          <Grid>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <SiteBadge text="#Ta-Te-Ti-Uy" />

              <Title mb="lg" fw={900} className={classes.title}>
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

              <Text size="lg" mb="lg" c="dimmed">
                Juega gratis al <Text span fw="bold">Ta-Te-Ti online</Text> con amigos. Compite con los mejores, sube en las clasificaciones y demuestra que eres el mejor.
              </Text>

              <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
                mb="xl"
                w="100%"
              >

                <Button
                  component="a"
                  href="/login"
                  radius="xl"
                  variant="filled"
                  color="grape"
                  size="xl"
                  leftSection={<IconRocket size={25} />}
                  fullWidth={!isDesktop}
                >
                  Jugar Ahora
                </Button>
                <Button
                  component="a"
                  href="/como-jugar"
                  radius="xl"
                  variant="default"
                  size="xl"
                  rightSection={<IconChevronRight size={25} />}
                  fullWidth={!isDesktop}
                >
                  Cómo Jugar?
                </Button>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Center h="100%">
                <Transition
                  transition="slide-left"
                  mounted={shouldMountHero}
                  duration={isDesktop ? 600 : 0}
                  timingFunction="ease"
                >
                  {(transitionStyles) => (
                    <Box className={classes.animatedBox} style={transitionStyles}>
                      {isDesktop && <>
                        <Transition mounted={showNotifications} transition="pop" duration={500}>
                          {(styles) => (
                            <Notification
                              icon={<IconShare3 size={20} />}
                              color="green"
                              title="¡Hora del duelo!"
                              withCloseButton={false}
                              radius="xl"
                              className={classes.animatedNotification1}
                              style={{
                                ...styles,
                              }}
                            >
                              Te compartieron el link de un reto
                            </Notification>
                          )}
                        </Transition>

                        <Transition mounted={showNotifications} transition="pop" duration={500}>
                          {(styles) => (
                            <Notification
                              icon={<IconBrain size={20} />}
                              color="grape"
                              title="Tenes tu estrategia?"
                              withCloseButton={false}
                              radius="xl"
                              className={classes.animatedNotification2}
                              style={{
                                ...styles,
                                position: "absolute",
                                bottom: -40,
                                right: -80,
                                zIndex: 1,
                              }}
                            >
                              Reta a tus amigos en un duelo
                            </Notification>
                          )}
                        </Transition>
                      </>
                      }

                      <ExampleBoard
                        className={classes.animatedBoard}
                      />
                    </Box>
                  )}
                </Transition>

              </Center>
            </Grid.Col>
          </Grid>
        </SiteSection>
      </Box>

      <SiteSection>
        <Ads />
        <Title order={2} size="h1" ta="center" mb="xl">Dominá el juego <Text inherit span c="grape">con estrategia</Text></Title>
        <SimpleGrid cols={{ base: 1, md: 3 }}>
          {cards.map((card, index) => (
            <Card key={index} p="md" radius="md" bg="none">
              <ThemeIcon variant="light" size="xl" color={card.color} mb="md">
                {card.icon}
              </ThemeIcon>
              <Title order={3} size="h2">
                {card.title}
              </Title>
              <Text>{card.description}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </SiteSection>

      <SiteSection>
        <SimpleGrid cols={{ base: 1, md: 3 }}>
          <Transition transition="slide-right" mounted={mounted && scroll.y > 100} duration={isDesktop ? 600 : 0} timingFunction="ease">
            {(transitionStyles) => (
              <Card
                radius="md"
                p="lg"
                withBorder style={transitionStyles}>
                <Title order={5} mb="md">
                  Tablero de juego
                </Title>
                <ExampleBoard />
              </Card>
            )}
          </Transition>

          <Card
            radius="md"
            p="lg"
            withBorder
          >
            <Title order={5} mb="xl">
              Únete a la comunidad y demostrá que sos el mejor jugador!
            </Title>
            <Center mb="lg">
              <Avatar.Group>
                <Avatar src="image.webp" size="xl" />
                <Avatar src="image.webp" size="xl" />
                <Avatar size="xl" variant="light" color="grape">+99</Avatar>
              </Avatar.Group>
            </Center>

            <Stack gap="md">
              <Button
                component="a"
                href="https://www.instagram.com/tateiti.uy"
                target="_blank"
                radius="xl"
                size="lg"
                variant="gradient"
                gradient={{ from: 'red', to: 'yellow', deg: 90 }}
                leftSection={<IconBrandInstagram size={20} />}
              >Siguenos en Instagram</Button>
            </Stack>
          </Card>

          <Card
            radius="md"
            p="lg"
            withBorder
            style={{
              background: `
                    radial-gradient(ellipse 110% 70% at 25% 80%, rgba(255, 20, 147, 0.15), transparent 55%),
                    radial-gradient(ellipse 80% 90% at 20% 30%, rgba(138, 43, 226, 0.18), transparent 50%),
                    transparent
                `,
              borderColor: "rgba(255, 20, 147, 0.15)"
            }}
          >
            <Title order={5} mb="xl">
              Coronate como el mejor jugador de Ta-Te-Ti del Uruguay.
            </Title>
            <Center>
              <Image
                src="/trophy.webp"
                alt="The Best"
                width={230}
                height={230}
              />
            </Center>
          </Card>
        </SimpleGrid>
      </SiteSection>

      <SiteSection size="sm">
        <Title order={2} size="h1" ta="center" mb="xl">Preguntas <Text inherit span c="grape">frecuentes</Text></Title>

        <Accordion
          chevronPosition="right"
          defaultValue="reset-password"
          chevronSize={26}
          variant="separated"
          disableChevronRotation
          styles={{ label: { color: 'var(--mantine-color-black)' }, item: { border: 0 } }}
          chevron={
            <ThemeIcon variant="light" color="cyan" radius="xl" size={26}>
              <IconPlus size={18} stroke={1.5} />
            </ThemeIcon>
          }
        >
          {faqs.map((faq, index) => (
            <Accordion.Item key={index} value={index.toString()}>
              <Accordion.Control>{faq.title}</Accordion.Control>
              <Accordion.Panel>{faq.description}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </SiteSection>

      <SiteSection>
        <Card
          withBorder
          p="xl"
          radius="md"
          shadow="sm"
          bg="var(--mantine-color-grape-5)"
        >
          <Container
            size="xs"
          >
            <Title order={2} size="h1" ta="center" mb="xs" c="white" tt="uppercase">
              Domina el juego definitivo
            </Title>
            <Text size="lg" ta="center" mb="xl" c="white">
              Crea tu cuenta en segundos y reclama tu nombre de usuario único antes de que lo haga otra persona.
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
          </Container>
        </Card>
      </SiteSection>
    </>
  )
}
