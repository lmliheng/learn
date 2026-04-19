import { useIntersectionObserver } from '@vueuse/core'

const lazyImg = {
    mounted(el) {
        // 保存原始图片路径
        const source_src = el.src
        // 先设置为默认图片   
        el.src = 'https://res.lgdsunday.club/img-load.png'
        // 监听元素是否进入视口
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
                el.src = source_src
                // 监听完成后，停止监听
                stop()
            }
        })

    }
}

export default {
    // app.use接收了一个将被用作 install() 方法的函数 。app(插件，插线选项)
    install(app) {
        // console.log(app);
        app.directive('lazyImg', lazyImg)
    }
}
