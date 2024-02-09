interface Network {
    id?: number;
    name?: string;
    country?: {
        name?: string;
        code?: string;
        timezone?: string;
    };
    officialSite?: string;
}

interface Schedule {
    time?: string;
    days?: string[];
}

interface Rating {
    average?: number;
}

interface Externals {
    tvrage?: number;
    thetvdb?: number;
    imdb?: string;
}

interface Image {
    medium?: string;
    original?: string;
}

interface Links {
    self?: {
        href?: string;
    };
    previousepisode?: {
        href?: string;
    };
}

export interface Show {
    id: number;
    url?: string;
    name?: string;
    type?: string;
    language?: string;
    genres: string[];
    status?: string;
    runtime?: number;
    averageRuntime?: number;
    premiered?: string;
    ended?: string;
    officialSite?: string;
    schedule?: Schedule;
    rating?: Rating;
    weight?: number;
    network?: Network;
    webChannel?: null;
    dvdCountry?: null;
    externals?: Externals;
    image?: Image;
    summary?: string;
    updated?: number;
    _links?: Links;
}

export interface SearchResultShow {
    score: number;
    show: Show;
}

