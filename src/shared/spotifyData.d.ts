export type InitialData = {
    profile: Profile,
    playlists: Playlist[],
}

export type Image = {
    url: string,
    height: number | null,
    width: number | null
}

export type Profile = {
    id: string,
    display_name: string,
    images: Image[],
    country: string,
};

export type Playlist = {
    id: string,
    name: string,
    images: Image[],
    public: boolean,
}

export type PlaylistItem = {
    item: Track,
}

export type Track = {
    id: string,
    name: string
}
