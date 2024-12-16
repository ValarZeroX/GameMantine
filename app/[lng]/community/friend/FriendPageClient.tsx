// app/[lng]/community/friend/FriendPageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Breadcrumbs,Switch, Button, Textarea, Anchor, Title, Container, Grid, Card, Text, Group, Divider, Center, Loader, ActionIcon, CopyButton, Tooltip, Blockquote } from '@mantine/core';
import { IconCopy, IconCheck, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../../i18n/client";
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';

interface Friend {
  id: number;
  userId: string;
  type: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    pokemonId: string;
  };
}

interface FriendPageClientProps {
  lng: string;
}

const FriendPageClient: React.FC<FriendPageClientProps> = ({ lng }) => {
  const { data: session } = useSession();
  const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);

  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendsUser, setFriendsUser] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [pokemonId, setPokemonId] = useState<string>('');

  // 初始化表單
  const form = useForm({
    initialValues: {
      message: '',
      status: true,
    },

    validate: {
      message: (value) => {
        if (value.trim().length === 0) {
          return t("common:empty_message");
        }
        if (value.length > 60) {
          return t("common:message_too_long");
        }
        return null;
      },
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        try {
          const response = await fetch('/api/user/getUser');
          const data = await response.json();

          if (response.ok) {
            setName(data.user.name);
            setPokemonId(data.user.pokemonId);
          }
        } catch (error) {
        }
      }
    };

    fetchUser();
  }, [session]);

  const fetchFriends = async () => {
    // if (session?.user?.id) {
    setLoading(true);
    try {
      const response = await fetch('/api/community/friend');
      const data = await response.json();
      if (response.ok) {
        setFriends(data.friends);
      } else {
        // showNotification({
        //   title: '错误',
        //   message: data.error || '获取好友失败',
        //   color: 'red',
        // });
      }
    } catch (error) {
      // console.error('Error fetching friends:', error);
      // showNotification({
      //   title: '错误',
      //   message: '获取好友失败',
      //   color: 'red',
      // });
    } finally {
      setLoading(false);
    }
    // }
  };

  const fetchFriendsUser = async () => {
    if (session?.user?.id) {
    setLoading(true);
    try {
      const response = await fetch('/api/community/friend/user');
      const data = await response.json();
      if (response.ok) {
        setFriendsUser(data.friends);
      } else {
        // showNotification({
        //   title: '错误',
        //   message: data.error || '获取好友失败',
        //   color: 'red',
        // });
      }
    } catch (error) {
      // console.error('Error fetching friends:', error);
      // showNotification({
      //   title: '错误',
      //   message: '获取好友失败',
      //   color: 'red',
      // });
    } finally {
      // setLoading(false);
    }
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendsUser();
  }, []);

  useEffect(() => {
    if (friendsUser.length > 0) {
      // 例如，選取第一筆資料的 message 作為預設值
      form.setFieldValue('message', friendsUser[0].message);
      form.setFieldValue('status', friendsUser[0].status === 'true');
    }
  }, [friendsUser]);

  // 提交表單處理
  const handleSubmit = async (values: { message: string; status: boolean }) => {
    try {
      const response = await fetch('/api/community/friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: values.message,
          status: values.status.toString(),
         }),
      });

      const data = await response.json();
      if (response.ok) {
        showNotification({
          title: t("common:notification.success"),
          message: t("common:notification.update_success"),
          color: 'green',
        });
        fetchFriends();
        fetchFriendsUser();
        // setFriends((prev) => {
        //   const existingIndex = prev.findIndex(friend => friend.type === data.friend.type && friend.userId === data.friend.userId);
        //   if (existingIndex !== -1) {
        //     const updatedFriends = [...prev];
        //     updatedFriends[existingIndex] = data.friend;
        //     return updatedFriends;
        //   }
        //   return [...prev, data.friend];
        // });
        form.reset();
      } else {
        showNotification({
          title: t("common:notification.error_title"),
          message: data.error || t("common:notification.update_failed"),
          color: 'red',
        });
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      showNotification({
        title: t("common:notification.error_title"),
        message: t("common:notification.update_failed"),
        color: 'red',
      });
    }
  };

  const items = [
    { title: t("common:navigation.home"), href: '/' },
    { title: t("common:community"), href: '#' },
    { title: t("common:friend"), href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const icon = <IconInfoCircle />;

  return (
    <Container size="lg">
      <Breadcrumbs>{items}</Breadcrumbs>
      <Title order={1} mt="sm">好友</Title>
      <Blockquote color="blue" icon={icon} mt="xl">
        <Text>{t("common:no_unrelated_messages")}</Text>
        {/* <Text>最多一則訊息，發表新訊息會將舊訊息覆蓋。</Text> */}
      </Blockquote>
      {/* 新增好友按鈕（僅顯示於登入狀態） */}
      {session?.user && (
        <Grid mt="md">
          <Grid.Col span={12}>
            <Card withBorder shadow="sm" radius="md">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Card.Section withBorder inheritPadding py="xs">
                  <Group mb="xs">
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>
                        {name}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {pokemonId}
                      </Text>
                    </div>
                    <Switch
                      mt="md"
                      label={t("common:show_message")}
                      {...form.getInputProps('status', { type: 'checkbox' })}
                    />
                  </Group>
                </Card.Section>
                <Textarea mb="md"
                  label={t("common:message")}
                  placeholder={t("common:enter_message")}
                  {...form.getInputProps('message')}
                  required
                  maxLength={60}
                  rightSection={`${form.values.message.length}/60`} // 顯示字數計數
                  rightSectionProps={{ style: { pointerEvents: 'none', paddingRight: 10 } }} // 避免計數被點擊
                />
                <Card.Section withBorder inheritPadding py="xs">
                  <Group mt="md" justify="center">
                    <Button type="submit">{t("common:share")}</Button>
                  </Group>
                </Card.Section>
              </form>
            </Card>
          </Grid.Col>
        </Grid>
      )}

      <Divider my="md" />
      {loading ? (
        <Center mt="lg">
          <Loader />
        </Center>
      ) : (
        <>
          {friends.length > 0 ? (
            <Grid mt="md">
              {friends.map(friend => (
                <Grid.Col key={friend.id} span={{ base: 12, sm: 12, md: 6, lg: 4 }}>
                  <Card withBorder shadow="sm" radius="md">
                    <Card.Section withBorder inheritPadding py="xs">
                      <Group mb="xs">
                        {/* <Avatar radius="xl" style={{ cursor: 'pointer' }} name={friend.user.name ?? ''} key={friend.user.name ?? ''} color="initials" /> */}
                        <div style={{ flex: 1 }}>
                          <Text size="sm" fw={500}>
                            {friend.user.name ?? ''}
                          </Text>
                          <Text c="dimmed" size="xs">
                            {friend.user.pokemonId}
                          </Text>
                        </div>
                        <CopyButton value={friend.user.pokemonId} timeout={2000}>
                          {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                              <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                {copied ? (
                                  <IconCheck />
                                ) : (
                                  <IconCopy />
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </Group>
                    </Card.Section>
                    <Text size="sm" c="dimmed" mt="md">
                      {friend.message}
                    </Text>
                    <Group mt="sm" justify="flex-end">
                      <Text size="xs" c="dimmed" mt="md">
                        {new Date(friend.createdAt).toLocaleDateString()}
                      </Text>
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Center mt="lg">
              <Text c="dimmed" size="sm">{t('common:no_data_found')}</Text>
            </Center>
          )}
        </>
      )}
    </Container>
  )
};

export default FriendPageClient;