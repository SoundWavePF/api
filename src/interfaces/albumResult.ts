export interface AlbumResult {
    id:           string;
    dz_Id:        string;
    name:         string;
    release_date: Date;
    image_small:  string;
    image_medium: string;
    image_big:    string;
    type:         AlbumResultType;
    Artist:       aArtist;
    Genre:        aGenre;
    Songs:        aSong[];
}

export interface aArtist {
    id:           string;
    dz_Id:        number;
    name:         string;
    image_small:  string;
    image_medium: string;
    image_big:    string;
    type:         ArtistType;
}

export enum ArtistType {
    Artist = "artist",
}

export interface aGenre {
    id:    string;
    dz_Id: string;
    name:  Name;
    type:  GenreType;
}

export enum Name {
    Dance = "Dance",
    Electro = "Electro",
    LatinMusic = "Latin Music",
    Pop = "Pop",
    RB = "R&B",
    RapHipHop = "Rap/Hip Hop",
    Reggaeton = "Reggaeton",
    Rock = "Rock",
}

export enum GenreType {
    Genre = "genre",
}

export interface aSong {
    id:            string;
    dz_Id:         number;
    title:         string;
    artist:        string;
    preview:       string;
    reproductions: number;
    duration:      number;
    genre:         Name;
    album:         string;
    type:          SongType;
}

export enum SongType {
    Track = "track",
}

export enum AlbumResultType {
    Album = "album",
}
