// app/[lng]/verify/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Title, Text, Button, Center } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from '../../i18n/client';

const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const status = searchParams.get('status');
  const { t } = useTranslation('zh-Hant', 'common');
  const [message, setMessage] = useState(t('verify.verifying'));

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const res = await fetch(`/api/auth/verify?token=${token}`);
          const data = await res.json();
          if (res.ok) {
            setMessage(t('verify.success'));
          } else {
            setMessage(data.error || t('verify.failure'));
          }
        } catch (error) {
        //   console.log('Error verifying email:', error);
          setMessage(t('verify.error'));
        }
      };

      verifyEmail();
    } else if (status === 'invalid') {
      setMessage(t('verify.invalidToken'));
    } else if (status === 'expired') {
      setMessage(t('verify.expiredToken'));
    }
  }, [token, status, t]);

  return (
    <Container size="sm" mt={50}>
      <Center>
        <Title>{t('verify.title')}</Title>
      </Center>
      <Text mt="md">
        {message}
      </Text>
      {message === t('verify.success') && (
        <Center mt="md">
          <Button component={Link} href="/login">
            {t('verify.goToLogin')}
          </Button>
        </Center>
      )}
    </Container>
  );
};

export default VerifyPage;