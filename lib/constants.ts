// lib/constants.ts

export const pt: { [key: number]: number } = {
    0: 0,
    1: 35,
    2: 70,
    3: 150,
    4: 500,
    5: 400,
    6: 1250,
    7: 1500,
    8: 2500,
};

export const aspectImages: { [key: number]: string } = {
    0: '/common/grass.webp',
    1: '/common/fire.webp',
    2: '/common/water.webp',
    3: '/common/lightning.webp',
    4: '/common/psychic.webp',
    5: '/common/fighting.webp',
    6: '/common/darkness.webp',
    7: '/common/metal.webp',
    8: '/common/dragon.webp',
    9: '/common/colorless.webp',
};

export const aspectStringToNumber: { [key: string]: number } = {
    'grass': 0,
    'fire': 1,
    'water': 2,
    'lightning': 3,
    'psychic': 4,
    'fighting': 5,
    'darkness': 6,
    'metal': 7,
    'dragon': 8,
    'colorless': 9,
};

export const rarityStringToNumber: { [key: string]: number } = {
    'Common': 1,
    'Uncommon': 2,
    'Rare': 3,
    'DoubleRare': 4,
    'ArtRare': 5,
    'SuperRare': 6,
    'ImmersiveRare': 7,
    'UltraRare': 8,
};

export const typeStringToNumber: { [key: string]: number } = {
    'pokemon': 0,
    'item': 1,
    'supporter': 2,
};

export const rarityImages: { [key: number]: string } = {
    0: '',
    1: '/common/Common.webp',
    2: '/common/Uncommon.webp',
    3: '/common/Rare.webp',
    4: '/common/DoubleRare.webp',
    5: '/common/ArtRare.webp',
    6: '/common/SuperRare.webp',
    7: '/common/ImmersiveRare.webp',
    8: '/common/UltraRare.webp',
};