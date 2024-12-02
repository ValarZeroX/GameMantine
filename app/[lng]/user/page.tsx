// app/[lng]/cards/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Layout from '../../../components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
// import { showNotification } from "@mantine/notifications";
import { IconX } from '@tabler/icons-react';
import UserPageClient from './UserPageClient'; // 客戶端組件

// 生成页面元数据
export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;

    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: translate('metadata.user_page_title'),
        description: translate('metadata.user_page_description'),
        keywords: translate('metadata.user_page_keywords'),
    };
}

// 页面组件，作为服务器组件
type UserPageProps = { params: Promise<{ lng: string; }> };

const UserPage = async ({ params }: UserPageProps) => {
    const { lng } = await params;

    return (
        <Layout lng={lng}>
            <UserPageClient  lng={lng} />
        </Layout>
    );
};

export default UserPage;