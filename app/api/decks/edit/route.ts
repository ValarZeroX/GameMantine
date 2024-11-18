import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// 假設有 Prisma 或其他 ORM
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const session = await getSession({ req });
    if (!session?.user?.id) {
        return res.status(401).json({ message: '未授權' });
    }

    const { deckUserId, deckName, deckCards, userId } = req.body;

    if (userId !== session.user.id) {
        return res.status(403).json({ message: '禁止存取' });
    }

    try {
        const updatedDeckUser = await prisma.deckUser.update({
            where: { id: deckUserId },
            data: {
                deckName,
                deck: {
                    update: {
                        deckCards,
                    },
                },
            },
        });
        return res.status(200).json(updatedDeckUser);
    } catch (error) {
        console.error('Error updating DeckUser:', error);
        return res.status(500).json({ message: '更新牌組失敗' });
    }
}