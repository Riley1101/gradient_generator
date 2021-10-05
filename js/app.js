let preview = document.querySelector('.generator__preview')
let code = document.querySelector('.code')
let gen = document.querySelector('.gen')
let save = document.querySelector('.save')
let container = document.querySelector('.colors__container')
let modal = document.querySelector('.modal')
let data = [];
let tmp;
class Color {
    constructor() {
        this.clr1 = '#'
        this.clr2 = '#'
        this.dir = ''
        this.code = ''
    }
    generate() {
        let num = '0123456789abcdef'
        let directions = [
            'to right', 'to left',
            'to bottom', 'to top',
            'to left top', 'to right top',
            'to left bottom', 'to right bottom'
        ]
        for (let i = 0; i < 6; i++) {
            this.clr1 = this.clr1 + num[Math.floor(Math.random() * 16)]
            this.clr2 = this.clr2 + num[Math.floor(Math.random() * 16)]
        }
        this.dir = directions[Math.floor(Math.random() * 8)]
        this.code = `linear-gradient(${this.dir},${this.clr1} , ${this.clr2})`
    }
}
let create = (clor) => {
    let ele = document.createElement('div')
    ele.classList.add('color')
    container.appendChild(ele)
    ele.style.background = clor.code

    ele.addEventListener('click', () => {
        code.innerHTML = clor.code
        preview.style.background = clor.code
        modal.classList.add('animate')
        setTimeout(() => {
            modal.classList.remove('animate')
        }, 1000)
        window.navigator.clipboard.writeText(preview.style.background)
    })
}

gen.addEventListener('click', () => {
    let color = new Color();
    color.generate()
    preview.style.background = color.code
    code.innerHTML = color.code
    tmp = color
})

save.addEventListener("click", () => {
    // as video gets long i forgot to check duplicate items :))
    if (!data.includes(tmp)) {
        data.push(tmp)
        let store = JSON.stringify(data)
        localStorage.setItem('colors', store)
        create(tmp)
    }

})


window.addEventListener('DOMContentLoaded', () => {
    let store = localStorage.getItem('colors')
    if (store) {
        let clrs = JSON.parse(store)
        clrs.map(clor => {
            create(clor)
        })
        data = clrs
    }
})