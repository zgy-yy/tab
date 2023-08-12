export function getWebSitIcon(websiteUrl: string) {
    return fetch(`/icon-api/${websiteUrl}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('请求失败')
            }
            return response.blob()
        })
}


export function debounce<T>(func: (args: T) => Promise<any>, delay: number) {
    let timer: number;

    return async function (args: T) {
        clearTimeout(timer);
        return new Promise((resolve,reject) => {

            timer = setTimeout(async function () {
                func(args).then(res => {
                    resolve(res)
                }).catch(res => {
                    console.log('err', res)
                    reject('err')
                })
            }, delay);
        })
    };
}
