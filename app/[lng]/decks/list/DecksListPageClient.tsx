// app/[lng]/decks/user/UserDecksPageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Box, Anchor, Title, Container, Grid, Card, Text, Group, ActionIcon, Center,Loader } from '@mantine/core';
import { IconX, IconListDetails, IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../../i18n/client";
import { showNotification } from '@mantine/notifications';

interface Deck {
    id: string;
    deckCards: string;
    version: number;
    createdAt: string;
    updatedAt: string;
}

interface DeckUser {
    id: number;
    deckId: string;
    userId: string;
    deckName: string;
    createdAt: string;
    updatedAt: string;
    deck: Deck;
}

interface DecksListPageClienttProps {
    lng: string;
}

const DecksListPageClient: React.FC<DecksListPageClienttProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);
    const [userDecks, setUserDecks] = useState<DeckUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <Container size="lg">
        </Container>
    );
};

export default DecksListPageClient;