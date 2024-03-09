export interface Author {
    name?: string;
    image?: string;
    externalLink?: string;
}

export interface Result {
    id: string;
    heading: string;
    image: string;
    cover: string;
    description: string;
    externalLink: string;
    author?: Author;
}
