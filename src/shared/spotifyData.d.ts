export type InitialData = {
    profile: Profile
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