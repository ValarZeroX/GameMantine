// app/[lng]/login/LoginClient.tsx
'use client';
import React, { useState } from 'react';
import { Button, Container, Title, Text, Divider, Checkbox, TextInput, PasswordInput, Blockquote } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconBrandGoogleFilled, IconBrandFacebookFilled, IconInfoCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useTranslation } from "../../i18n/client";

type LoginClientProps = {
    lng: string;
};

const LoginClient: React.FC<LoginClientProps> = ({ lng }) => {
    const [error, setError] = useState('');
    const { t } = useTranslation(lng, 'common');
    const router = useRouter();

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
        const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });
        if (res?.error) {
            setError(res.error);
        } else {
            router.push('/'); // 登入成功後導向首頁
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: '/' });
    };
    const icon = <IconInfoCircle />;
    return (
        <Container size="xs">
            <Title order={2} style={{ marginBottom: 30, textAlign: 'center' }}>
                {t('login.title')}
            </Title>
            {/* <Text size="sm" style={{ marginBottom: 20, textAlign: 'center' }}>
                {t('login.agreementNotice')}
            </Text> */}
            {error && (
                <Text color="red" size="sm" style={{ marginBottom: 10, textAlign: 'center' }}>
                    {error}
                </Text>
            )}
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label={t('register.email')}
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    withAsterisk
                    label={t('register.password')}
                    placeholder="Password"
                    {...form.getInputProps('password')}
                />
                <Checkbox
                    mt="md"
                    label={t('login.stayLoggedIn')}
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                    style={{ marginBottom: 10 }}
                />
                <Button fullWidth type="submit" variant="default">{t('login.login')}</Button>
            </form>
            <Divider my="md" label={t('login.or')} labelPosition="center" />
            <Button justify="space-between" fullWidth leftSection={<IconBrandGoogleFilled size={14} />} variant="default" style={{ marginBottom: 10 }} rightSection={<span />} onClick={handleGoogleSignIn}>
                {t('login.google')}
            </Button>
            <Blockquote color="blue" cite="" icon={icon} mt="xl">
            <p>{t('privacyPolicy.content')}</p>
            <p>{t('privacyPolicy.content_2')}</p>
            </Blockquote>
            <Text size="sm" style={{ marginBottom: 30 }}>
                {t('login.noAccount')} <Link href="/register">{t('register.register')}</Link>
            </Text>
        </Container>
    );
};

export default LoginClient;