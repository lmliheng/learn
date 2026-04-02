let nav1Data = [
    {
        tag: '1',
        name: '青菜',
        num: '100g',
        category: '厨用',
        price: '10元',
        img: 'app.png'
    },
    {
        tag: '1',
        name: '苹果',
        num: '200g',
        category: '生鲜',
        price: '15元',
        img: 'apple.png'
    },
    {
        tag: '1',
        name: '猪肉',
        num: '300g',
        category: '生鲜',
        price: '35元',
        img: 'app.png'
    },
    {
        tag: '1',
        name: '酱油',
        num: '500ml',
        category: '厨用',
        price: '12元',
        img: 'soy_sauce.png'
    },
    {
        tag: '1',
        name: '薯片',
        num: '150g',
        category: '休闲',
        price: '8元',
        img: 'chips.png'
    },
    {
        tag: '1',
        name: '可乐',
        num: '330ml',
        category: '饮品',
        price: '5元',
        img: 'cola.png'
    },
    {
        tag: '1',
        name: '纸巾',
        num: '10包',
        category: '居家',
        price: '20元',
        img: 'tissue.png'
    },
    {
        tag: '1',
        name: '大米',
        num: '5kg',
        category: '厨用',
        price: '45元',
        img: 'rice.png'
    },
    {
        tag: '1',
        name: '水饺',
        num: '400g',
        category: '速食',
        price: '18元',
        img: 'dumpling.png'
    },
    {
        tag: '2',
        name: '青菜',
        num: '100g',
        category: '厨用',
        price: '10元',
        img: 'app.png'
    },
    {
        tag: '2',
        name: '苹果',
        num: '200g',
        category: '生鲜',
        price: '15元',
        img: 'apple.png'
    },
    {
        tag: '2',
        name: '猪肉',
        num: '300g',
        category: '生鲜',
        price: '35元',
        img: 'app.png'
    },
    {
        tag: '2',
        name: '酱油',
        num: '500ml',
        category: '厨用',
        price: '12元',
        img: 'soy_sauce.png'
    },
    {
        tag: '2',
        name: '薯片',
        num: '150g',
        category: '休闲',
        price: '8元',
        img: 'chips.png'
    },
    {
        tag: '2',
        name: '可乐',
        num: '330ml',
        category: '饮品',
        price: '5元',
        img: 'cola.png'
    },
    {
        tag: '2',
        name: '纸巾',
        num: '10包',
        category: '居家',
        price: '20元',
        img: 'tissue.png'
    },
    {
        tag: '2',
        name: '大米',
        num: '5kg',
        category: '厨用',
        price: '45元',
        img: 'rice.png'
    },
    {
        tag: '2',
        name: '水饺',
        num: '400g',
        category: '速食',
        price: '18元',
        img: 'dumpling.png'
    }
];


const nav1liList = document.querySelectorAll('#nav-1 li');
const main2ContentTopList = document.querySelectorAll('#main-2-content .main-2-content-column-top');
console.log(main2ContentTopList);
console.log(nav1liList);
nav1liList[0].classList.add('main-2-nav-li-active');
for (let i = 0; i < nav1liList.length; i++) {
    nav1liList[i].addEventListener('mouseenter', function () {
        for (let j = 0; j < nav1liList.length; j++) {
            nav1liList[j].classList.remove('main-2-nav-li-active');
        }
        this.classList.add('main-2-nav-li-active');
        if (i == 1) {
            for (let j = 0; j < main2ContentTopList.length; j++) {
                main2ContentTopList[j].innerHTML = `  
                    <img src="uploads/fresh1.png" alt="">
                    <p class="content-name">${nav1Data[j].name},${nav1Data[j].num}</p>
                    <p class="content-name">${nav1Data[j].category}</p>
                    <p class="content-price">￥${nav1Data[j].price}</p>`;
            }

        }

    })

}

// go top
const goTop = document.querySelector('.go-top-positive');
goTop.addEventListener('click', function () {
    // window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth'
    // })
    document.documentElement.scrollTop = 0
})


const main1 = document.querySelector('.main-1');
window.addEventListener('scroll', function () {
   
    if (window.scrollY > main1.offsetTop) {
        goTop.classList.remove('go-top-positive');
        goTop.classList.add('go-top-active');
    } else {
        goTop.classList.remove('go-top-active');
        goTop.classList.add('go-top-positive');
    }
})


const headerFixed = document.querySelector('.header-fixed');
window.addEventListener('scroll', function () {
    headerFixed.style.top = window.scrollY > main1.offsetTop ? '-20px' : '-120px';
})
