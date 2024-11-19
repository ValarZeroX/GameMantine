// app/[lng]/register/RegisterClient.tsx
'use client';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Group,
    Divider,
    Center,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTranslation } from "../../i18n/client";

type RegisterClientProps = {
    lng: string;
};

const RegisterClient: React.FC<RegisterClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'common');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            // termsOfService: false,
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : t('register.invalidEmail'),
            password: (value) =>
                value.length >= 8 ? null : t('register.passwordLength'),
            confirmPassword: (value, values) =>
                value === values.password ? null : t('register.passwordMismatch'),
            // termsOfService: (value) =>
            //     value ? null : t('register.agreeToTerms'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setIsLoading(true);
        try {
            const payload = { ...values, lng };
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                showNotification({
                    title: t('notification.success'),
                    message: t('notification.successMessage'),
                    color: 'green',
                    icon: <IconCheck size={16} />,
                });
                router.push(`/${lng}/login`);
            } else {
                showNotification({
                    title: t('notification.errorTitle'),
                    message: data.error || t('notification.errorMessage'),
                    color: 'red',
                    icon: <IconX size={16} />,
                });
            }
        } catch (error) {
            showNotification({
                title: t('notification.errorTitle'),
                message: t('notification.errorMessage'),
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container size={420} my={40}>
            <Center>
                <Title>
                    {t('register.createAccount')}
                </Title>
            </Center>
            <Center>
                <Text c="dimmed" size="sm">
                    {t('register.alreadyHaveAccount')}{' '}
                    <Anchor component={Link} href="/login" size="sm">
                        {t('login.login')}
                    </Anchor>
                </Text>
            </Center>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label={t('register.name')}
                        placeholder={t('register.yourName')}
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label={t('register.email')}
                        placeholder="your@email.com"
                        required
                        mt="md"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label={t('register.password')}
                        placeholder={t('register.passwordPlaceholder')}
                        required
                        mt="md"
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        label={t('register.confirmPassword')}
                        placeholder={t('register.confirmPasswordPlaceholder')}
                        required
                        mt="md"
                        {...form.getInputProps('confirmPassword')}
                    />
                    {/* <Checkbox
                        label={
                            <Text size="sm">
                                {t('register.agreeTo')}{' '}
                                <Anchor href="#" size="sm">
                                    {t('register.termsOfService')}
                                </Anchor>
                            </Text>
                        }
                        mt="xl"
                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                    /> */}
                    <Button fullWidth mt="xl" type="submit" loading={isLoading}>
                        {t('register.register')}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterClient;