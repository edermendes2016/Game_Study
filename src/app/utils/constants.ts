export const SPRITES = {
    PLAYER: {
        BASE: 'player',
        FIGHT: 'player_fight',
        TYPE: 'player'
    },
    BOAR: {
        BASE: 'boar',
        FIGHT: 'boar_fight',
        TYPE: 'boar'
    },
    PORTAL: {
        BASE: 'portal',
    },
    ALIANCA: {
        BASE: 'alliance',
        FIGHT: 'alliance_fight',
        TYPE: 'alliance'
    },
    HORDA: {
        BASE: 'horda',
        FIGHT: 'horda_fight',
        TYPE: 'horda'
    }
}

export const LAYERS = {
    HOOKMAP: {
        GROUND: 'ground',
     //   WALLS: 'walls',
        WATER: 'water',        
     //   SHOP: 'shop'
    },
    DUNGEONMAP: {
        LAVA: "lava",
        WAY: "way",
        BACKGROUND: "background",
    }
}

export const TILES = {
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
    HOOK: 'hook'
}