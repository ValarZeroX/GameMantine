// app/[lng]/friend/FriendPageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Breadcrumbs,Box, Anchor, Title, Container, Grid, Card, Text, Group, ActionIcon, Center,Loader, Image } from '@mantine/core';
import { IconX, IconCards, IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../i18n/client";
import { showNotification } from '@mantine/notifications';


interface FriendPageClientProps {
    lng: string;
}

const FriendPageClient: React.FC<FriendPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);


    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: "好友", href: '#' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));

    return (
        <Container size="lg">
            <Title order={1} mt="sm">好友</Title>
        </Container>
    )
};

export default FriendPageClient;