// app/[lng]/user/UserPageClient.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button, Breadcrumbs, Anchor, Title, Center, TextInput, Text,  Container, Box } from '@mantine/core';
import { IconDiamondsFilled, IconStarFilled, IconCrown, IconX, IconSearch, IconFilter, IconFilterOff, IconCheck, IconCategory, IconHeart, IconSword, IconRefresh, IconDeviceFloppy } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslation } from "../../i18n/client";
// import classes from './CardsPage.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSession } from 'next-auth/react';
import { showNotification } from "@mantine/notifications";
import { pt, aspectImages, aspectStringToNumber, rarityStringToNumber, typeStringToNumber, dexColorMap, odds } from '@/lib/constants';



interface UserPageClientProps {
    lng: string;
}

const UserPageClient: React.FC<UserPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { t } = useTranslation(lng, ['common']);
    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [pokemonId, setPokemonId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    console.log

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
    // useEffect(() => {
    //     if (session?.user) {
    //         setName(session.user.name || '');
    //         // setPokemonId(session.user.pokemonId || '');
    //     }
    // }, [session]);

    const handleUpdate = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, pokemonId }),
            });

            const data = await response.json();

            if (response.ok) {
                showNotification({
                    title: t('common:notification.success'),
                    message: t('common:notification.update_success'),
                    color: 'green',
                });
                // 可选：刷新会话或页面
                router.refresh();
            } else {
                showNotification({
                    title: t("common:notification.error_title"),
                    message: data.error || t('common:notification.update_failed'),
                    color: 'red',
                });
            }
        } catch (error) {
            console.error('更新失败:', error);
            showNotification({
                title: t("common:notification.error_title"),
                message: t('common:notification.update_failed'),
                color: 'red',
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: t('common:navigation.member_settings'), href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));


    console.log('session', session);

    return (
        <Container size="lg">
            {!session?.user ? (
                <Center>
                    <Text>
                        {t('common:errors.error_insufficient_permissions')}{' '}
                        <Anchor component={Link} href="/login" size="sm">
                            {t('common:login.login')}
                        </Anchor>
                    </Text>
                </Center>
            ) : (
                <>
                    <Breadcrumbs>{items}</Breadcrumbs>
                    <Title order={1} mt="sm">{t('common:navigation.member_settings')}</Title>

                    <Box mt="md">
                        <TextInput
                            label={t('common:name')}
                            placeholder={t('common:enter_name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            mb="sm"
                        />
                        <TextInput
                            label={t('common:pokemon_id')}
                            placeholder={t('common:enter_pokemon_id')}
                            value={pokemonId}
                            onChange={(e) => setPokemonId(e.target.value)}
                            // required
                            mb="sm"
                        />
                        <Button
                            onClick={handleUpdate}
                            loading={isSubmitting}
                            // leftIcon={<IconDeviceFloppy />}
                            disabled={isSubmitting}
                        >
                            {t('common:save_changes')}
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default UserPageClient;