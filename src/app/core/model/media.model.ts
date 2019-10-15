export interface Media {
    id: number;
    mediaType: string;
    mediaName: string;
    originalMediaName: string;
    mediaSize: string;
    mediaSizeInByte: number;
    mediaPath: string;
    thumbnailPath: string;
    height: number;
    width: number;
    status: boolean;
    createdAt: number;
}
