'use client';
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Button, Container, Title, Text, Modal, Divider, Checkbox, TextInput, PasswordInput, Paper } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { IconBrandGoogleFilled, IconBrandFacebookFilled } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import Link from 'next/link'

const LoginPage: React.FC = () => {
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const router = useRouter();

    const handleNavigation = (path: string) => {
      router.push(path);
    };

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

    return (
        <Layout>
        <Container size="xs">
                    <Title order={2} style={{ marginBottom: 30, textAlign: 'center' }}>
                        {t('login.title')}
                    </Title>
                    <Text size="sm" style={{ marginBottom: 20, textAlign: 'center' }}>
                        繼續操作即表示您同意我們的使用者協議,並確認您了解隱私權政策。
                    </Text>
                    {error && (  // 顯示錯誤訊息
                        <Text color="red" size="sm" align="center" style={{ marginBottom: 10 }}>
                            {error}
                        </Text>
                    )}
                    <form onSubmit={form.onSubmit()}>
                        <TextInput
                            withAsterisk
                            label="電子信箱"
                            placeholder="your@email.com"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            withAsterisk
                            label="密碼"
                            placeholder="Password"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                        <Checkbox
                            mt="md"
                            label="保持登入"
                            key={form.key('termsOfService')}
                            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                            style={{ marginBottom: 10 }}
                        />
                        <Button fullWidth type="submit" variant="default">登入</Button>
                    </form>
                    <Divider my="md" label={t('login.or')} labelPosition="center" />
                    <Button justify="space-between" fullWidth leftSection={<IconBrandGoogleFilled size={14} />} variant="default"  style={{ marginBottom: 10 }} rightSection={<span />}>
                        {t('login.google')}
                    </Button>
                    <Button justify="space-between" fullWidth leftSection={<IconBrandFacebookFilled size={14} />} variant="default" style={{ marginBottom: 10 }} rightSection={<span />}>
                        {t('login.facebook')}
                    </Button>
                    <Text size="sm" style={{ marginBottom: 30 }}>
                        還沒有帳號？ <Link href="/register">註冊</Link>
                    </Text>
                </Container>
        </Layout>
    );
};

export default LoginPage;