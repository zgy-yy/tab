// indexedDB.js，浏览器本地数据库操作


class IndexDB {
    indexedDB = window.indexedDB
    db:any = null

    constructor() {
        let request = this.indexedDB.open('TabDb')
        // err
        request.onerror = event => {
            console.log('数据库打开/创建报错', event)
        }
        // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
        // 升级后自动触发success
        request.onupgradeneeded = () => {
            let db = request.result// 数据库对象
            this.db = db
            // 建表 iconData,主键为task_id
            const store = this.db.createObjectStore('iconData', {
                keyPath: 'order_index',//主键
                // autoIncrement: true//自增
            })
            // 新建索引名称、索引所在的属性、配置对象（说明该属性是否允许有重复的值）
            store.createIndex('order_index', 'order_index', {
                unique: false
            })
            store.createIndex('file', 'file', {
                unique: false
            })
            console.log('数据库升级')
        }
        // success
        request.onsuccess = event => {
            this.db = request.result
            console.log('数据库打开/创建成功', event)
        }
    }

    add(data: any, order: number) {
        let request = this.db.transaction(['iconData'], 'readwrite').objectStore('iconData').add({
            id: new Date().getTime(),
            file: data,
            order_index: order
        })
        request.onsuccess = () => {
            console.log('添加成功')
        }
        request.onerror = () => {
            console.log('主键 order_index 重复')
        }
    }


    read(order_index: number) {
        const transaction = this.db.transaction(['iconData'])
        let objectStore = transaction.objectStore('iconData')
        let request = objectStore.get(order_index)
        return new Promise<any>((resolve, reject) => {
            request.onerror = function () {
                console.log('获取列表失败')
                reject('err')
            }
            request.onsuccess = function () {
                if (request.result) {
                    console.log('res', request.result)
                    resolve(request.result)
                } else {
                    console.log('未获得数据记录')
                    resolve(null)
                }
            }
        })
    }


    async getList() {
        const transaction = this.db.transaction(['iconData'])
        let objectStore = transaction.objectStore('iconData')
        // 遍历数据库
        return new Promise<Array<any>>(resolve => {
            const list: Array<any> = []
            objectStore.openCursor().onsuccess = (event: any) => {
                let cursor = event.target.result
                if (cursor) {
                    list.push(cursor.value)
                    cursor.continue()
                } else {
                    console.log('数据库list', list)
                    resolve(list)
                }
            }
        })

    }


    update(data: any, order_index: number) {
        let request = this.db.transaction(['iconData'], 'readwrite').objectStore('iconData').put({
            id: new Date().getTime(),
            file: data,
            order_index: order_index
        })
        request.onsuccess = () => {
            console.log('数据更新成功')
        }
        request.onerror = () => {
            console.log('数据更新失败')
        }
    }

    clickDel(id: number) {
        const request = this.db.transaction(['iconData'], 'readwrite')
            .objectStore('iconData')
            .delete(id)
        request.onsuccess = () => {
        }
        request.onerror = () => {
        }
    }

}

export default new IndexDB()