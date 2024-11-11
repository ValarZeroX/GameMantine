'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout/Layout';

type CardDetailPage = { params: { lng: string; id: string } };
const CardDetailPage: React.FC<CardDetailPage> = ({ params }) => {
    // const router = useRouter();
    // const { id, lng } = router.query;
    const resolvedParams = use(params);
    const { lng, id } = resolvedParams;

    return (
        <Layout lng={lng}>
        <div>
            <h1>Card Detail Page</h1>
            <p>Language: {lng}</p>
            <p>Card ID: {id}</p>
            {/* Add more details and components as needed */}
        </div>
        </Layout>
    );
};

export default CardDetailPage;