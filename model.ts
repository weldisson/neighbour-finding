export type UUIDv4 = string;

export interface Card {
    order: number;
    trailId: string;
}

export interface Trail {
    order: number;
    cardIdActive: any;
}

export interface Skeleton {
    trails: {
        [index: string]: Trail;
    };
    cards: {
        [index: string]: Card;
    };
}