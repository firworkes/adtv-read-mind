var srcdiv = null;
var temp = null;
export const carDragstart = (event, divdom) => {  // 当开始拖动时
    // event.preventDefault()
    srcdiv = divdom;
    temp = divdom.innerHTML;
    // console.log(temp)
}

export const carOndragend = (event) => {  // 用户完成元素拖动后触发
    // event.preventDefault()
    // console.log("用户完成元素拖动")
}

export const carOndrop = (event, divdom) => {  // 用户释放鼠标时
    event.preventDefault()
    console.log(divdom)
    if (srcdiv !== divdom) {
        srcdiv.innerHTML = divdom.innerHTML;
        divdom.innerHTML = temp;
    }
}

export const carOndragenter = (event) => {  // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    // event.preventDefault()
    // console.log(event.srcElement.textContent)
    // srcElement
}

export const carOndragover = (event) => { // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    event.preventDefault()
    // console.log("拖动的对象在另一对象容器范围内拖动时触发此事件")
    // console.log(event.srcElement.textContent)
}

// export default carDragstart carOndragover;