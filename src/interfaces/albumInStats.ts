export interface AlbuminStats {
    id:           string;
    dz_Id:        number;
    name:         string;
    artist:       string;
    release_date: Date;
    image_small:  string;
    image_medium: string;
    image_big:    string;
    type:         string;
    songs:        SongInStats[];
}

export interface SongInStats {
    id:                 string;
    dz_Id:              number;
    name:               string;
    preview:            string;
    image_small:        string;
    image_medium:       string;
    image_big:          string;
    reproductions:      number;
    added_to_favorites: number;
    added_to_playlists: number;
    duration:           number;
    type:               Type;
    genreId:            string;
}

enum Type {
    Track = "track",
}
