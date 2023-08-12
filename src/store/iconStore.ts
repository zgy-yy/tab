import {defineStore} from "pinia";
import {IconInfo} from "../types/uintType.ts";
import {ref} from "vue";
import indexDb from "../utils/db.ts";


const useIconStore = defineStore('icon', () => {
    const icons = ref<IconInfo[]>(
        []
    )

    function update() {
        indexDb.getList().then(res => {
            for (const icon of res) {
                icons.value.push(icon.file)
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
        icons.value.push(icon)
        indexDb.getList().then(res => {
            indexDb.add(icon, res.length)
        })

    }

    function change(sourceIndex: number, targetIndex: number) {
        [icons.value[sourceIndex], icons.value[targetIndex]] = [icons.value[targetIndex], icons.value[sourceIndex]]
        icons.value = [...icons.value]
    }

    return {
        icons,
        getIcons,
        addIcon,
        change
    }
})
export default useIconStore;