export interface SocialLink {
    url: string;
    label: string;
    icon: string;
}

export interface SocialLinks {
    [key: string]: SocialLink;
}