import {defineStore} from "pinia";
import {IconInfo} from "../types/uintType.ts";
import {reactive, toRaw} from "vue";
import indexDb from "../utils/db.ts";


const useIconStore = defineStore('icon', () => {
    const icons = reactive<IconInfo[]>(
        []
    )

    function update() {
        indexDb.getList().then(res => {
            for (const icon of res) {
                icons.push(icon.file)
            }
        })
    }

    function getIcons() {
        if (indexDb.db) {
            update()
        } else {
            setTimeout(() => {
                getIcons()
            }, 100)
        }
    }


    function addIcon(icon: IconInfo) {
        icons.push(icon)
        indexDb.getList().then(res => {
            indexDb.add(icon, res.length)
        })

    }

    function change(sourceIndex: number, targetIndex: number) {
        [icons[sourceIndex], icons[targetIndex]] = [icons[targetIndex], icons[sourceIndex]]
        indexDb.update(toRaw(icons[sourceIndex]),sourceIndex)
        indexDb.update(toRaw(icons[targetIndex]),targetIndex)
    }

    return {
        icons,
        getIcons,
        addIcon,
        change
    }
})
export default useIconStore;