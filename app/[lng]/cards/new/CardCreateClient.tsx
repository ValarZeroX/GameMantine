// app/[lng]/cards/new/CardCreateClient.tsx
'use client';

import React from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  NumberInput,
  Select,
  MultiSelect,
  Button,
  Container,
  Grid,
  Textarea,
  Text,
  Group,
  Image
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTranslation } from "../../../i18n/client";

import { MultiSelectProps } from '@mantine/core';


interface CardCreateClientProps {
  lng: string;
}

const CardCreateClient: React.FC<CardCreateClientProps> = ({ lng }) => {
  const { t } = useTranslation(lng, ['common']);

  const form = useForm({
    initialValues: {
      number: '',
      set: '',
      dex: [] as string[],
      rarity: '1', // 改為字串
      name: '',
      type: '0', // 改為字串
      stage: '0', // 改為字串
      hp: '0', // 改為字串
      aspects: '0', // 改為字串
      illustrator: '',
      point: '0', // 改為字串
      rule: '',
      attack_1: '0', // 改為字串
      attack_name_1: '',
      attack_aspects_1: '', // 保持為字串
      attack_skill_name_1: '',
      attack_2: '', // 保持為字串
      attack_name_2: '',
      attack_aspects_2: '', // 保持為字串
      attack_skill_name_2: '',
      ability_name: '',
      ability_directions: '',
      ability: '', // 改為字串
      retreat: '0', // 改為字串
      retreat_aspects: '', // 保持為字串
      weakness: '0', // 改為字串
      weakness_value: '0', // 改為字串
      reprints: '', // 保持為字串
    },

    validate: {
      number: (value) => (value ? null : '必填'),
      set: (value) => (value ? null : '必填'),
      dex: (value) => (value.length > 0 ? null : '必填'),
      name: (value) => (value ? null : '必填'),
      illustrator: (value) => (value ? null : '必填'),
      // 可選填驗證（攻擊2與特性）
      attack_name_1: (value, values) =>
        values.attack_1 !== '0' && !value ? '必填' : null,
      attack_aspects_1: (value, values) => {
        if (values.attack_1 !== '0') {
          const aspects = value.split(',').map(Number);
          if (aspects.some(isNaN)) {
            return '請輸入有效的數字，並以逗號分隔';
          }
          return null;
        }
        return null;
      },
      attack_aspects_2: (value, values) => {
        if (values.attack_2 !== '' && Number(values.attack_2) > 0) {
          const aspects = value.split(',').map(Number);
          if (aspects.some(isNaN)) {
            return '請輸入有效的數字，並以逗號分隔';
          }
          return null;
        }
        return null;
      },
      retreat_aspects: (value) => {
        const aspects = value.split(',').map(Number);
        if (aspects.some(isNaN)) {
          return '請輸入有效的數字，並以逗號分隔';
        }
        return null;
      },
      weakness: (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0 ? null : '必填';
      },
      reprints: (value) => {
        if (value) {
          const reprintsArray = value.split(',');
          // 可以添加更嚴格的驗證，如每個項目是否符合特定格式
        }
        return null;
      },
      // attack_2 和 ability 是選填
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // 將逗號分隔的字串轉換為陣列，並將必要的欄位轉換為數字
      const formattedValues = {
        ...values,
        number: values.number,
        set: values.set,
        dex: values.dex, // 保持為字串陣列
        rarity: rarityStringToNumber[values.rarity],
        type: Number(values.type),
        stage: Number(values.stage),
        hp: Number(values.hp),
        aspects: Number(values.aspects),
        point: Number(values.point),
        attack_1: Number(values.attack_1),
        attack_2: values.attack_2 ? Number(values.attack_2) : undefined,
        ability: values.ability ? Number(values.ability) : undefined,
        retreat: Number(values.retreat),
        weakness: Number(values.weakness),
        weakness_value: Number(values.weakness_value),
        attack_aspects_1: values.attack_aspects_1
          ? values.attack_aspects_1.split(',').map(Number)
          : [],
        attack_aspects_2: values.attack_aspects_2
          ? values.attack_aspects_2.split(',').map(Number)
          : undefined,
        retreat_aspects: values.retreat_aspects
          ? values.retreat_aspects.split(',').map(Number)
          : [],
        reprints: values.reprints
          ? values.reprints.split(',').map((item) => item.trim())
          : null,
      };

      const response = await fetch(`/api/card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedValues),
      });

      if (response.ok) {
        showNotification({
          title: t('common:notification.success_title'),
          message: t('common:notification.success_message'),
          color: 'green',
          icon: <IconCheck size={16} />,
        });
        form.reset();
      } else {
        const errorData = await response.json();
        showNotification({
          title: t('common:notification.error_title'),
          message: errorData.error || t('common:notification.error_message'),
          color: 'red',
          icon: <IconX size={16} />,
        });
      }
    } catch (error) {
      showNotification({
        title: t('common:notification.error_title'),
        message: t('common:notification.error_message'),
        color: 'red',
        icon: <IconX size={16} />,
      });
    }
  };

  // 定義稀有度選項
const seriesOptionsRarity = [
    'Common',
    'Uncommon',
    'Rare',
    'DoubleRare',
    'ArtRare',
    'SuperRare',
    'ImmersiveRare',
    'UltraRare'
  ].map((rarity) => ({
    value: rarity,
    label: `${t(`common:${rarity}`)}`,
  }));
  
  // 自定義選項渲染函數
  const renderSelectOption: MultiSelectProps['renderOption'] = ({ option }) => (
    <Group gap="sm">
      <Image src={`/common/${option.value}.webp`} alt={option.label} height={20} width={20} />
      <Text size="sm">{option.label}</Text>
    </Group>
  );
  
  const rarityStringToNumber: { [key: string]: number } = {
    'Common': 1,
    'Uncommon': 2,
    'Rare': 3,
    'DoubleRare': 4,
    'ArtRare': 5,
    'SuperRare': 6,
    'ImmersiveRare': 7,
    'UltraRare': 8,
  };

  return (
    <Container size="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          {/* 其他表單字段... */}

          {/* 示例： number */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:number')}
              placeholder="e.g., A1-001"
              {...form.getInputProps('number')}
              required
            />
          </Grid.Col>

          {/* 示例： name */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:name')}
              placeholder="e.g., Moltres Ex"
              {...form.getInputProps('name')}
              required
            />
          </Grid.Col>

          {/* 示例： set */}
          <Grid.Col span={6}>
            <Select
              label={t('common:set')}
              placeholder={t('common:select_set')}
              data={[
                { value: 'A1', label: 'A1' },
                { value: 'PROMO', label: 'PROMO' },
              ]}
              {...form.getInputProps('set')}
              required
            />
          </Grid.Col>

          {/* 示例： dex */}
          <Grid.Col span={6}>
            <MultiSelect
              label={t('common:dex')}
              placeholder={t('common:select_dex')}
              data={[
                { value: 'A1C', label: 'A1C' },
                { value: 'A1M', label: 'A1M' },
                { value: 'A1P', label: 'A1P' },
              ]}
              {...form.getInputProps('dex')}
              required
            />
          </Grid.Col>

          {/* 示例： rarity */}
          <Grid.Col span={4}>
          <Select
              label={t('common:rarity')}
              placeholder={t('common:select_rarity')}
              data={seriesOptionsRarity}
              renderOption={renderSelectOption}
              {...form.getInputProps('rarity')}
              required
            />
          </Grid.Col>

          {/* 示例： type */}
          <Grid.Col span={4}>
            <NumberInput
              label={t('common:type')}
              placeholder="e.g., 1"
              {...form.getInputProps('type')}
              required
            />
          </Grid.Col>

          {/* 示例： stage */}
          <Grid.Col span={4}>
            <NumberInput
              label={t('common:stage')}
              placeholder="e.g., 2"
              {...form.getInputProps('stage')}
              required
            />
          </Grid.Col>

          {/* 示例： hp */}
          <Grid.Col span={6}>
            <NumberInput
              label={t('common:hp')}
              placeholder="e.g., 120"
              {...form.getInputProps('hp')}
              required
            />
          </Grid.Col>

          {/* 示例： aspects */}
          <Grid.Col span={6}>
            <Select
              label={t('common:aspects')}
              placeholder={t('common:aspects')}
              data={[
                { value: '0', label: '草' },
                { value: '1', label: '火' },
                { value: '2', label: '水' },
                { value: '3', label: '雷電' },
                { value: '4', label: '超能' },
                { value: '5', label: '格鬥' },
                { value: '6', label: '惡' },
                { value: '7', label: '金屬' },
                { value: '8', label: '龍' },
                { value: '9', label: '普通' },
                { value: '10', label: '無色' },
              ]}
              {...form.getInputProps('aspects')}
              required
            />
          </Grid.Col>

          {/* 示例： illustrator */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:illustrator')}
              placeholder="e.g., John Doe"
              {...form.getInputProps('illustrator')}
              required
            />
          </Grid.Col>

          {/* 示例： point */}
          {/* <Grid.Col span={6}>
            <NumberInput
              label={t('common:point')}
              placeholder="e.g., 1000"
              {...form.getInputProps('point')}
            />
          </Grid.Col> */}

          {/* 示例： rule */}
          <Grid.Col span={12}>
            <Textarea
              label={t('common:rule')}
              placeholder="輸入規則..."
              {...form.getInputProps('rule')}
            />
          </Grid.Col>

          {/* 示例： attack_1 */}
          <Grid.Col span={6}>
            <NumberInput
              label={t('common:attack_1')}
              placeholder="e.g., 50"
              {...form.getInputProps('attack_1')}
              required
            />
          </Grid.Col>

          {/* 示例： attack_name_1 */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:attack_name_1')}
              placeholder="e.g., 衝撞"
              {...form.getInputProps('attack_name_1')}
              required
            />
          </Grid.Col>

          {/* 示例： attack_aspects_1 (改為 TextInput) */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:attack_aspects_1')}
              placeholder="e.g., 0,9,9"
              {...form.getInputProps('attack_aspects_1')}
              required
            />
          </Grid.Col>

          {/* 示例： attack_skill_name_1 */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:attack_skill_name_1')}
              placeholder="e.g., 攻擊特殊效果說明"
              {...form.getInputProps('attack_skill_name_1')}
            />
          </Grid.Col>

          {/* 示例： attack_2 */}
          <Grid.Col span={6}>
            <NumberInput
              label={t('common:attack_2')}
              placeholder="e.g., 30"
              {...form.getInputProps('attack_2')}
            />
          </Grid.Col>

          {/* 示例： attack_name_2 */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:attack_name_2')}
              placeholder="e.g., 衝撞"
              {...form.getInputProps('attack_name_2')}
            />
          </Grid.Col>

          {/* 示例： attack_aspects_2 (改為 TextInput) */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:attack_aspects_2')}
              placeholder="e.g., 1,2,3"
              {...form.getInputProps('attack_aspects_2')}
            />
          </Grid.Col>

          {/* 示例： attack_skill_name_2 */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:attack_skill_name_2')}
              placeholder="e.g., 攻擊特殊效果說明"
              {...form.getInputProps('attack_skill_name_2')}
            />
          </Grid.Col>

          {/* 示例： ability_name */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:ability_name')}
              placeholder="e.g., Solar Power"
              {...form.getInputProps('ability_name')}
            />
          </Grid.Col>

          {/* 示例： ability_directions */}
          <Grid.Col span={6}>
            <Textarea
              label={t('common:ability_directions')}
              placeholder="輸入特性說明..."
              {...form.getInputProps('ability_directions')}
            />
          </Grid.Col>

          {/* 示例： ability */}
          <Grid.Col span={6}>
            <NumberInput
              label={t('common:ability')}
              placeholder="e.g., 2"
              {...form.getInputProps('ability')}
            />
          </Grid.Col>

          {/* 示例： weakness (單選 Select) */}
          <Grid.Col span={6}>
            <Select
              label={t('common:weakness')}
              placeholder={t('common:select_weakness')}
              data={[
                { value: '0', label: '草' },
                { value: '1', label: '火' },
                { value: '2', label: '水' },
                { value: '3', label: '雷電' },
                { value: '4', label: '超能' },
                { value: '5', label: '格鬥' },
                { value: '6', label: '惡' },
                { value: '7', label: '金屬' },
                { value: '8', label: '龍' },
                { value: '9', label: '普通' },
                { value: '10', label: '無色' },
              ]}
              {...form.getInputProps('weakness')}
              required
            />
          </Grid.Col>

          {/* 示例： weakness_value */}
          <Grid.Col span={6}>
            <NumberInput
              label={t('common:weakness_value')}
              placeholder="e.g., 30"
              {...form.getInputProps('weakness_value')}
              required
            />
          </Grid.Col>

          {/* 示例： retreat */}
          <Grid.Col span={6}>
            <NumberInput
              label={t('common:retreat')}
              placeholder="e.g., 1"
              {...form.getInputProps('retreat')}
            />
          </Grid.Col>

          {/* 示例： retreat_aspects (改為 TextInput) */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:retreat_aspects')}
              placeholder="e.g., 0,1,2"
              {...form.getInputProps('retreat_aspects')}
              required
            />
          </Grid.Col>

          {/* 示例： reprints */}
          <Grid.Col span={6}>
            <TextInput
              label={t('common:reprints')}
              placeholder="e.g., A1-002,A1-003"
              {...form.getInputProps('reprints')}
            />
          </Grid.Col>

          {/* 提交按鈕 */}
          <Grid.Col span={12}>
            <Button type="submit" fullWidth mt="md">
              {t('common:add_card')}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
};

export default CardCreateClient;