export interface DBError {
    name:     string;
    errors:   Error[];
    parent:   Original;
    original: Original;
    fields:   Fields;
    sql:      string;
}

export interface Error {
    message:       string;
    type:          string;
    path:          string;
    value:         string;
    origin:        string;
    instance:      Instance;
    validatorKey:  string;
    validatorName: null;
    validatorArgs: any[];
}

export interface Instance {
    id:               string;
    rol:              string;
    requested_artist: boolean;
    deactivated:      boolean;
    name:             string;
    username:         string;
    email:            string;
    image_avatar:     string;
    password:         string;
}

export interface Fields {
    email: string;
}

export interface Original {
    length:     number;
    name:       string;
    severity:   string;
    code:       string;
    detail:     string;
    schema:     string;
    table:      string;
    constraint: string;
    file:       string;
    line:       string;
    routine:    string;
    sql:        string;
    parameters: Array<boolean | string>;
}
