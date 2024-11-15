// app/[lng]/cards/new/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Layout from '../../../../components/Layout/Layout';
import CardCreateClient from './CardCreateClient'; // 客戶端組件
import { useTranslation } from '../../../i18n/index';

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'common');
    const { t } = translation;

    return {
        title: t('metadata.new_card_title'),
        description: t('metadata.new_card_description'),
    };
}

// 页面组件，作为服务器组件
type NewCardPageProps = { params: Promise<{ lng: string; }> };

const NewCardPage = async ({ params }: NewCardPageProps) => {
    const { lng } = await params;

    return (
        <Layout lng={lng}>
            <></>
            {/* <CardCreateClient lng={lng} /> */}
        </Layout>
    );
};

export default NewCardPage;