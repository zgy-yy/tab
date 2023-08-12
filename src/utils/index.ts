
export function getWebSitIcon(websiteUrl: string) {
    return fetch(`/icon-api/${websiteUrl}`)
        .then(response => response.blob())
        .then(data => {
            return data
        })
        .catch(error => {
            console.error(error);
        });
}


export function debounce<T>(func: (args: T) => Promise<any>, delay: number) {
    let timer: number;

    return async function (args: T) {
        clearTimeout(timer);
        return new Promise(resolve => {
            timer = setTimeout(function () {
                func(args).then(res => {
                    resolve(res)
                })
            }, delay);
        })
    };
}
