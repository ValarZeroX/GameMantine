//app/[lng]/login/page.tsx
import React from 'react';
import { Metadata } from 'next';
import LoginClient from './LoginClient'; // 客戶端組件
import Layout from '../../../components/Layout/Layout';
import { useTranslation } from '../../i18n/index';

interface MetadataParams {
    params: Promise<{ lng: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: translate('metadata.login_page_title'),
        description: translate('metadata.login_page_description'),
        keywords: translate('metadata.login_page_keywords'),
    };
}

type LoginPageProps = { params: Promise<{ lng: string }> };

const LoginPage = async ({ params }: LoginPageProps) => {
    const { lng } = await params;

    return (
        <Layout lng={lng}>
            <LoginClient lng={lng} />
        </Layout>
    );
};

export default LoginPage;