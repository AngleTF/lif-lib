/**
 * 动画效果
 * @param node
 * @param style
 * @param fn
 */
const animation = (node, style, fn) => {
    let sped; // 步进值样式值
    let current; // 当前元素样式值
    let boole; // 判断定时器flag
    let num;

    clearInterval(node.timer);

    node.timer = setInterval(function () {
        boole = true;
        for (const k in style) {
            switch (k) {
            case 'opacity':
                // opacity 使用百进制传入
                num = getStyle(node, k) * 100;
                break;
            case 'scrollTop':
                num = window.scrollY;
                break;
            default:
                num = getStyle(node, k);
            }

            current = parseInt(num);

            sped = current + (style[k] - current) * 0.1;

            sped = style[k] > current ? Math.ceil(sped) : Math.floor(sped);

            switch (k) {
            case 'opacity':
                node.style[k] = sped / 100;
                node.style.filter = 'alpha(opacity:' + sped + ')';
                break;
            case 'z-index':
                node.style[k] = style[k];
                break;
            case 'scrollTop':
                document.body[k] = sped;
                document.documentElement[k] = sped;
                break;
            default:
                node.style[k] = sped + 'px';
            }

            if (style[k] !== sped) {
                boole = false;
            }
        }
        if (boole) {
            clearInterval(node.timer);
            if (fn) fn.call(node);
        }
    }, 30);
};

/**
 * 获取非行间样式
 * @param ele
 * @param style
 * @returns {string}
 */
const getStyle = (ele, style) => {
    return ele.currentStyle ? ele.currentStyle[style] : getComputedStyle(ele, null)[style];
};

export {
    animation
};
