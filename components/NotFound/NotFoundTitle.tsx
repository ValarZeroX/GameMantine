'use client';

import React from 'react';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import classes from './NotFoundTitle.module.css';
import { useTranslation } from 'react-i18next';

function NotFoundTitle() {
  const router = useRouter();
  const { t } = useTranslation();
  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>{t('notFound.title')}</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        {t('notFound.error')}
      </Text>
      <Group position="center">
        <Button size="md" onClick={handleGoHome}>
          {t('notFound.button')}
        </Button>
      </Group>
    </Container>
  );
}

export default NotFoundTitle;