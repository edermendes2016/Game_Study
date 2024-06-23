export const SPRITES = {
    PLAYER: {
        BASE: 'player',
        FIGHT: 'player_fight',
        TYPE: 'player'
    },
    BOAR: 'boar',
    PORTAL: {
        BASE: 'portal',
    },
    ALIANCA: 'alliance',
    HORDA: 'horda'
}

export const LAYERS = {
    GROUND: 'ground',
    WALLS: 'walls',
    WATER: 'water',
    SHOP: 'shop'
}

export const TILES = {
    DUROTAR: 'durotar',
    ELVIN_FOREST: 'elvin_forest',
    DUNGEON: 'dungeon',
    HOOK: "hook",
}

export const SIZES = {
    PLAYER: {
        WIDTH: 48,
        HEIGHT: 48,
    },
    BOAR: {
        WIDTH: 32,
        HEIGHT: 32,
    },
    TILE: 32,
}

export const GAME_CONFIG = {
    WIDTH: 800,
    HEIGHT: 600,
    MAP_WIDTH: SIZES.TILE * 60,
    MAP_HEIGHT: SIZES.TILE * 40,
}

export const TILEMAP_KEYS = {
    DUNGEON: 'dungeon',
    ELVIN_FOREST: 'elvin_forest',
    HOOK: 'hook'
}