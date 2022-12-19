export interface Poster {
    title: string;
    status: boolean;
    id?:string
}


export interface postersState {
    posts: Poster[];
    loading: boolean;
    disabled: boolean;
    posting: boolean;
}
