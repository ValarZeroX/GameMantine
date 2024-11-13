'use client';
import React, { use, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import { Button, Container, Title, Text, Modal, Divider, Checkbox, TextInput, PasswordInput, Paper } from '@mantine/core';
// import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { IconBrandGoogleFilled, IconBrandFacebookFilled } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import Link from 'next/link'
import { signIn } from "next-auth/react";
import { useTranslation } from "../../i18n/client";



type LoginPage = {children: React.ReactNode; params: { lng: string } };

// export default function LoginPage({ params }: LoginPage) {
const LoginPage: React.FC<LoginPage> = ({ params }) => {
    const resolvedParams = use(params);
    const { lng } = resolvedParams;
    const [error, setError] = useState('');
    const { t } = useTranslation(lng, 'common');
    const router = useRouter();

    // const handleNavigation = (path: string) => {
    //   router.push(path);
    // };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            termsOfService: false,
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        // 使用 NextAuth.js 的 signIn 方法進行登入
        const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });
        // console.log(res)
        if (res?.error) {
            setError(res.error);
        } else {
            router.push('/'); // 登入成功後導向首頁
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: '/' });
    };

    return (
        <Layout lng={lng}>
            <Container size="xs">
                <Title order={2} style={{ marginBottom: 30, textAlign: 'center' }}>
                    {t('login.title')}
                </Title>
                <Text size="sm" style={{ marginBottom: 20, textAlign: 'center' }}>
                    {t('login.agreementNotice')}
                </Text>
                {error && (  // 顯示錯誤訊息
                    <Text color="red" size="sm" style={{ marginBottom: 10, textAlign: 'center' }}>
                        {error}
                    </Text>
                )}
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk
                        label={t('register.email')}
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        label={t('register.password')}
                        placeholder="Password"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <Checkbox
                        mt="md"
                        label={t('login.stayLoggedIn')}
                        key={form.key('termsOfService')}
                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                        style={{ marginBottom: 10 }}
                    />
                    <Button fullWidth type="submit" variant="default">{t('login.login')}</Button>
                </form>
                <Divider my="md" label={t('login.or')} labelPosition="center" />
                <Button justify="space-between" fullWidth leftSection={<IconBrandGoogleFilled size={14} />} variant="default" style={{ marginBottom: 10 }} rightSection={<span />} onClick={handleGoogleSignIn}>
                    {t('login.google')}
                </Button>
                <Button justify="space-between" fullWidth leftSection={<IconBrandFacebookFilled size={14} />} variant="default" style={{ marginBottom: 10 }} rightSection={<span />}>
                    {t('login.facebook')}
                </Button>
                <Text size="sm" style={{ marginBottom: 30 }}>
                    {t('login.noAccount')} <Link href="/register">{t('register.register')}</Link>
                </Text>
            </Container>
        </Layout>
    );
};

export default LoginPage;