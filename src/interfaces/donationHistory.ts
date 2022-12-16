export interface DonationsUserHistory {
    id:        string;
    amount:    string;
    status:    string;
    type:      string;
    createdAt: Date;
    updatedAt: Date;
    artistId:  string;
    userId:    string;
    artist:    Artist;
}

export interface DonationsArtistHistory {
    id:        string;
    amount:    string;
    status:    string;
    type:      string;
    createdAt: Date;
    updatedAt: Date;
    artistId:  string;
    userId:    string;
    user:      User;
}

interface User {
    id:               string;
    name:             string;
    username:         string;
    email:            string;
    password:         string;
    rol:              string;
    image_avatar:     string;
    requested_artist: boolean;
    deactivated:      boolean;
}


interface Artist {
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
}


