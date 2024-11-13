//app/[lng]/register/page.tsx
import React from 'react';
import { Metadata } from 'next';
import RegisterClient from './RegisterClient'; // 客戶端組件
import { useTranslation } from '../../i18n/index';
import Layout from '../../../components/Layout/Layout';

interface MetadataParams {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
  const { lng } = await params;
  const translation = await useTranslation(lng, 'common');
  const { t: translate } = translation;

  return {
    title: translate('metadata.register_page_title'),
    description: translate('metadata.register_page_description'),
    keywords: translate('metadata.register_page_keywords'),
  };
}

type RegisterPageProps = { params: Promise<{ lng: string }> };

const RegisterPage = async ({ params }: RegisterPageProps) => {
  const { lng } = await params;

  return (
    <Layout lng={lng}>
      <RegisterClient lng={lng} />
    </Layout>
  );
};

export default RegisterPage;
