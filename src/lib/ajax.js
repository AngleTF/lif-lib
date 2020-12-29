import Url from './Url';

/**
 * ajax请求
 * @param fields
 */
const ajax = (fields) => {
    let {
        url = '',
        method = 'GET',
        data = {},
        dataType = 'json',
        successFun = () => {
        },
        errorFun = () => {
        },
        requestHeader = {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        timeout = 0,
        timeoutFun = () => {
        },
        async = true,
        uploadProgress = () => {
        },
        uploadSuccessFun = () => {
        },
        uploadErrorFun = () => {
        }
    } = fields;

    const oUrl = new Url(url);
    for (const key in data) {
        oUrl.set(key, data[key]);
    }

    method = method.toUpperCase();

    switch (method) {
    case 'GET':
        url = oUrl.combine();
        break;
    case 'POST':
        break;
    }

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.responseType = dataType;

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 200 && xhr.status < 300) {
            successFun(xhr.response);
        } else if (xhr.status >= 300 && xhr.readyState === 4) {
            // 如果失败返回对象本身
            errorFun(xhr);
        }
    });

    if (timeout) {
        xhr.timeout = timeout;
        xhr.addEventListener('timeout', timeoutFun);
    }

    for (const k in requestHeader) {
        xhr.setRequestHeader(k, requestHeader[k]);
    }

    // upload
    xhr.upload.addEventListener('progress', uploadProgress);
    xhr.upload.addEventListener('load', uploadSuccessFun);
    xhr.upload.addEventListener('error', uploadErrorFun);

    xhr.send(oUrl.getQuery());
};

export default ajax;
