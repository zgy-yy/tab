interface Size {
    x: number,
    y: number
}

export interface IconInfo {
    size: Size,
    info: {
        name: string,
        url: string,
        img: string
    }
}