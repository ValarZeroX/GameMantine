// lib/constants.ts

export const setDexMenu: { [key: string]: string[] } = {
    "A1": ["A1C", "A1M", "A1P"],
    "PROMO-A":[],
    "A1a": [],
    "A2": ["A2D", "A2P"]
};

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
    'pokemon_tool': 3,
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

export const commonRate: { [key: number]: number[] } = {
    0: [0, 0, 0, 0, 0],
    1: [2, 2, 2, 0, 0],
    2: [0, 0, 0, 2.57, 1.71],
    3: [0, 0, 0, 0.36, 1.43],
    4: [0, 0, 0, 0.33, 1.33],
    5: [0, 0, 0, 0.32, 1.29],
    6: [0, 0, 0, 0.07, 0.29],
    7: [0, 0, 0, 0.22, 0.89],
    8: [0, 0, 0, 0.01, 0.05],
}

export const rareRate: { [key: number]: number[] } = {
    0: [0, 0, 0, 0, 0],
    1: [0, 0, 0, 0, 0],
    2: [0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0],
    4: [0, 0, 0, 0, 0],
    5: [5.26, 5.26, 5.26, 5.26, 5.26],
    6: [6.77, 6.77, 6.77, 6.77, 6.77],
    7: [5.26, 5.26, 5.26, 5.26, 5.26],
    8: [1.75, 1.75, 1.75, 1.75, 1.75],
}

export const odds: { [key: number]: number[] } = {
    0: [0, 0, 0],
    1: [100, 0, 0],
    2: [0, 90, 60],
    3: [0, 5, 20],
    4: [0, 1.666, 6.664],
    5: [0, 2.572, 10.288],
    6: [0, 0.5, 2],
    7: [0, 0.222, 0.888],
    8: [0, 0.04, 0.16],
}

export const oddsRare: { [key: string]: number[][] } = {
    "A1C": [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [40, 40, 40],
        [50, 50, 50],
        [5, 5, 5],
        [5, 5, 5],
    ],
    "A1M": [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [42.105, 42.105, 42.105],
        [47.368, 47.368, 47.368],
        [5.263, 5.263, 5.263],
        [5.263, 5.263, 5.263],
    ],
    "A1P": [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [40, 40, 40],
        [50, 50, 50],
        [5, 5, 5],
        [5, 5, 5],
    ],
    "A1a":[
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [33.333, 33.333, 33.333],
        [55.555, 55.555, 55.555],
        [5.555, 5.555, 5.555],
        [5.555, 5.555, 5.555],
    ],
    "A2D": [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [46.153, 46.153, 46.153],
        [46.153, 46.153, 46.153],
        [3.846, 3.846, 3.846],
        [3.846, 3.846, 3.846],
    ],
    "A2P": [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [46.153, 46.153, 46.153],
        [46.153, 46.153, 46.153],
        [3.846, 3.846, 3.846],
        [3.846, 3.846, 3.846],
    ],
}

export const dexColorMap: { [key: string]: string } = {
    A1C: 'red',
    A1M: 'purple',
    A1P: 'yellow',
    A1a: 'green',
    A2D: 'blue',
    A2P: 'pink',
};