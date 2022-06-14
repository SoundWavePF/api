export interface SearchResult {
    songData:   SongDatum[];
    albumData:  AlbumDatum[];
    artistData: ArtistDatum[];
}

export interface AlbumDatum {
    id:           string;
    dz_Id:        string;
    name:         string;
    release_date: Date;
    image_small:  string;
    image_medium: string;
    image_big:    string;
    type:         AlbumDatumType;
}

export enum AlbumDatumType {
    Album = "album",
}

export interface ArtistDatum {
    id:           string;
    dz_Id:        number;
    name:         string;
    image_small:  string;
    image_medium: string;
    image_big:    string;
    type:         ArtistDatumType;
}

export enum ArtistDatumType {
    Artist = "artist",
}

export interface SongDatum {
    id:            string;
    dz_Id:         number;
    title:         string;
    artist:        string;
    preview:       string;
    image_small:   string;
    image_medium:  string;
    image_big:     string;
    reproductions: number;
    duration:      number;
    genre:         Genre;
    album:         string;
    type:          SongDatumType;
    Artists:       Artist[];
}

export interface Artist {
    id:           string;
    dz_Id:        number;
    name:         string;
    type:         ArtistDatumType;
    Contributors: Contributors;
}

export interface Contributors {
    createdAt: Date;
    updatedAt: Date;
    ArtistId:  string;
    SongId:    string;
}

export enum Genre {
    Dance = "Dance",
    Electro = "Electro",
    LatinMusic = "Latin Music",
    Pop = "Pop",
    RB = "R&B",
    RapHipHop = "Rap/Hip Hop",
    Reggaeton = "Reggaeton",
    Rock = "Rock",
}

export enum SongDatumType {
    Track = "track",
}
