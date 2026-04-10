export default {
    namespaced: true,
    // strict: true, 严格模式，严格模式下不能直接在$store.state修改状态，只能通过mutations修改状态
    // 状态
    state: {
        store_count: 10,
        user_list: [{
            name: 'admin',
            age: 18,
            sex: '男',
            ip: '127.0.0.1',
            email: 'admin@qq.com'
            // 其他属性
        }, {
            name: 'user1',
            age: 20,
            sex: '男',
            ip: '127.0.0.2',
            email: 'user@qq.com'
            // 其他属性
        }]
    },

    // 一般来处理state中的数组
    getters: {
        // 获取所有年龄大于18岁的用户年龄数组
        getStoreAgeBeyond18(state) {
            return state.user_list.filter(item => item.age > 18).map(item => {
                return item.age
            })
        },
        // 根据用户名获取所有相同名字的用户对象
        getStoreUserByName(state) {
            return state.user_list.filter(item => item.name == 'admin').map(item => {
                return item
            })
        },
        // 获取所有用户名数组
        getStoreNameList(state) {
            return state.user_list.map(item => {
                return item.name
            })
        },

    },

    mutations: {
        incrementOne(state) {
            state.store_count++
        },
        subtractOne(state) {
            state.store_count--
        },
        increment10(state, payload) {
            state.store_count += payload
        }
    },
    actions: {
        stopThreeSecondAddOne({ commit }, payload) {
            setTimeout(() => {
                commit('incrementOne')
            }, payload * 1000)
        }
    }
}