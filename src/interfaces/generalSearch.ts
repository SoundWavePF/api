export interface SearchResult {
    songData:   SongDatum[];
    albumData:  Datum[];
    artistData: Datum[];
}

export interface Datum {
    id:           string;
    name:         string;
    image_small:  string;
    type:         string;
    artists?:     AlbumDatumArtist[];
    deactivated?: boolean;
}

interface AlbumDatumArtist {
    deactivated: boolean;
}

export interface SongDatum {
    id:            string;
    name:          string;
    preview:       string;
    image_small:   string;
    type:          Type;
    reproductions: number;
    duration:      number;
    artists:       SongDatumArtist[];
    album:         Album;
}

interface Album {
    name: string;
    id:   string;
}

interface SongDatumArtist {
    id:          string;
    dz_Id:       number;
    name:        string;
    deactivated: boolean;
}

enum Type {
    Track = "track",
}
