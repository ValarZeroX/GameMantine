// app/sitemap.ts

import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://pokemonnier.com/';
    const languages = ['zh-Hant', 'zh-Hans', 'en'];

    const cards = await prisma.card.findMany({
        select: {
            number: true, // 只選取需要的字段
        },
    });

    const decks = await prisma.deck.findMany({
        select: {
            id: true, // 只選取需要的字段
        },
    });

    const cardUrls = cards.flatMap((card) =>
        languages.map((lng) => ({
            url: `${baseUrl}/${lng}/cards/${card.number}`,
            lastModified: new Date().toISOString(),
        }))
    );

    const deckUrls = decks.flatMap((deck) =>
        languages.map((lng) => ({
            url: `${baseUrl}/${lng}/decks/${deck.id}`,
            lastModified: new Date().toISOString(),
        }))
    );

    const staticUrls = languages.flatMap((lng) => [
        {
            url: `${baseUrl}/${lng}/`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/favicon.svg`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/${lng}/cards`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/${lng}/recommend`,
            lastModified: new Date().toISOString(),
        },
    ]);

    return [...staticUrls, ...cardUrls, ...deckUrls];
}
