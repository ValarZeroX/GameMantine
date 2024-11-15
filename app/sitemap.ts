// app/sitemap.ts

import type { MetadataRoute } from 'next';

async function fetchCards() {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'https://pokemonnier.com/'}/api/card`);
    if (!res.ok) {
        throw new Error('Failed to fetch cards data');
    }
    const cards = await res.json();
    return cards;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://pokemonnier.com/';
    const languages = ['zh-Hant'];

    // 获取所有卡片数据
    const cards = await fetchCards();

    // 生成卡片页面的 URL
    const cardUrls = cards.flatMap((card: any) =>
        languages.map((lng) => ({
            url: `${baseUrl}/${lng}/cards/${card.number}`,
            lastModified: new Date().toISOString(),
        }))
    );

    // 添加静态页面的 URL
    const staticUrls = languages.flatMap((lng) => [
        {
            url: `${baseUrl}/${lng}/`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/${lng}/cards`,
            lastModified: new Date().toISOString(),
        },
        // ...其他静态页面
    ]);

    return [...staticUrls, ...cardUrls];
}
