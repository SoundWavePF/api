export interface ArtistInAlbum {
    id:           string;
    dz_Id:        number;
    stripe_Id:    string;
    name:         string;
    description:  string;
    image_small:  string;
    image_medium: string;
    image_big:    string;
    type:         string;
    userId:       string;
    album_artist: AlbumArtist;
}

interface AlbumArtist {
    createdAt: Date;
    updatedAt: Date;
    albumId:   string;
    artistId:  string;
}
