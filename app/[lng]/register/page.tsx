'use client';

import React, { useState, use } from 'react';
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
  Box,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from '@tabler/icons-react';
// import { useTranslation } from 'react-i18next';
import Layout from '../../../components/Layout/Layout';
import { useTranslation } from "../../i18n/client";

type RegisterPage = { children: React.ReactNode; params: { lng: string } };
const RegisterPage: React.FC<RegisterPage> = ({ params }) => {
  const resolvedParams = use(params);
  const { lng } = resolvedParams;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(lng, 'common');
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: false,
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : '無效的電子郵件',
      password: (value) =>
        value.length >= 8 ? null : '密碼必須至少 8 個字符',
      confirmPassword: (value, values) =>
        value === values.password ? null : '密碼不匹配',
      termsOfService: (value) =>
        value ? null : '您必須同意服務條款',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        showNotification({
          title: '成功',
          message: '註冊成功！',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
        router.push('/login');
      } else {
        showNotification({
          title: '失敗',
          message: data.error || '註冊失敗。',
          color: 'red',
          icon: <IconX size={16} />,
        });
      }
    } catch (error) {
      showNotification({
        title: '失敗',
        message: '註冊過程中出現錯誤。',
        color: 'red',
        icon: <IconX size={16} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout lng={lng}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          {t('register.createAccount')}
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          {t('register.alreadyHaveAccount')}{' '}
          <Anchor component={Link} href="/login" size="sm">
            {t('login.login')}
          </Anchor>
        </Text>

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

            <Checkbox
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
            />

            <Button fullWidth mt="xl" type="submit" loading={isLoading}>
              {t('register.register')}
            </Button>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
