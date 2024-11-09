'use client';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lang/i18n'; // Adjust the path as necessary
import { Notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from '../../theme';

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <MantineProvider theme={theme}>
        {/* 確保 Notifications 位於 MantineProvider 內部 */}
        {children}
        <Notifications />
      </MantineProvider>
    </I18nextProvider>
  );
};

export default ClientProviders;