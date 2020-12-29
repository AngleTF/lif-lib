/**
 * 获取files元素的数据
 * @param fields
 */
const getFilesData = (fields) => {
    let {
        files = [],
        limit = 1,
        size = 0,
        allowMime = ['text/plain', 'image/jpeg', 'image/png'],
        successFun = () => {
        },
        errorFun = () => {
        },
        dataType = 'image'
    } = fields;

    const ERR_CODE = {
        LIMIT_ERR: '文件数量超过limit限制',
        MIME_ERR: '%s文件mime不正确',
        SIZE_ERR: '%s文件size不正确',
        LOAD_ERR: '%s文件加载失败'
    };

    dataType = dataType.toUpperCase();

    // 拖拽放入文件 element.target.files || element.dataTransfer.files;
    // 获取input file, element.files;

    if (files.length > limit) {
        errorFun(ERR_CODE.LIMIT_ERR);
        return;
    }

    [...files].forEach((file) => {
        const reader = new FileReader();

        if (!inArray(file.type, allowMime)) {
            errorFun(ERR_CODE.MIME_ERR.replace('%s', file.name));
            return;
        }

        if (file.size > size) {
            errorFun(ERR_CODE.SIZE_ERR.replace('%s', file.name));
            return;
        }

        switch (dataType) {
        case 'IMAGE':
            reader.readAsDataURL(file);
            break;
        case 'TEXT':
        default:
            reader.readAsText(file);
            break;
        }

        reader.onload = (e) => {
            successFun(e.target.result, e);
        };
        reader.onerror = () => {
            errorFun(ERR_CODE.LOAD_ERR.replace('%s', file.name));
        };
    });
};

export default {
    getFilesData
};
