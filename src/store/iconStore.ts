import {defineStore} from "pinia";
import {IconInfo} from "../types/uintType.ts";


const useIconStore = defineStore('icon', {
    state: (): { icons: IconInfo[] } => {
        return {
            icons: [{
                size: {x: 1, y: 2}, info: {name: '百度', url: 'https://www.iqiyi.com', img: 'https://infinityicon.infinitynewtab.com/user-share-icon/c9f7546ad597dd7fb53e8129b6c07877.png?imageMogr2/thumbnail/176x/format/webp/blur/1x0/quality/100|imageslim'}
            },
                {
                    size: {x: 1, y: 2}, info: {name: '腾讯', url: '', img: ''}
                }, {
                    size: {x: 1, y: 1}, info: {name: '高德', url: '', img: ''}
                }, {
                    size: {x: 1, y: 1}, info: {name: '百度', url: '', img: ''}
                }, {
                    size: {x: 2, y: 2}, info: {name: 'bilibili', url: '', img: ''}
                }, {
                    size: {x: 3, y: 2}, info: {name: 'vue', url: '', img: ''}
                }, {
                    size: {x: 1, y: 1}, info: {name: 'pinia', url: '', img: ''}
                }, {
                    size: {x: 1, y: 1}, info: {name: 'github', url: '', img: ''}
                },{
                    size: {x: 1, y: 1}, info: {name: 'porhub', url: '', img: ''}
                },{
                    size: {x: 1, y: 1}, info: {name: 'youtube', url: '', img: ''}
                },{
                    size: {x: 1, y: 1}, info: {name: 'google', url: '', img: ''}
                },{
                    size: {x: 1, y: 1}, info: {name: 'Gmail', url: '', img: ''}
                },{
                    size: {x: 1, y: 1}, info: {name: 'React', url: '', img: ''}
                }]
        }
    },
    getters: {
        iconInfo: (state) => {
            return state.icons
        }
    },
    actions: {
        addIcon(icon: IconInfo) {
            this.icons.push(icon)
        },
        change(sourceIndex: number, targetIndex: number) {
            const temp = this.icons[targetIndex]
            this.icons.splice(targetIndex, 1)
            this.icons.splice(sourceIndex, 0, temp)
        }
    }

})
export default useIconStore;