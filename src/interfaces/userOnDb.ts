export interface UserOnDb {
    id:               string;
    rol:              string;
    requested_artist: boolean;
    deactivated:      boolean;
    name:             string;
    username:         string;
    email:            string;
    image_avatar:     string;
    password?:         string;
}
