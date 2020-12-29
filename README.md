### 简介
存放类库和函数

### 安装
```
npm install lif-lib
```

### 包含的函数库列表

<ul>
    <li>Url class</li>
</ul>    

### Url class

**ES6用法**
```js
import { Url } from 'lif-lib';

const url = new Url('https://baidu.com/index.php?query=ok');

// Create a new query string
url.set('key1', 'value1');
url.set('key2', 'value2');

// Generate a new url
// https://baidu.com/index.php?query=ok&key1=value1&key2=value2
let newUrl = url.combine();

// Modify the old query string
url.set('query', 'no');
// https://baidu.com/index.php?query=no&key1=value1&key2=value2
newUrl = url.combine();

// Get query string
let paramQuery = url.get('key1');

// Remove query string
url.remove('key1');

// Get serialization query string
// query=no&key2=value2
url.getQuery();

/**
 * example url https://baidu.com/index.php?query=ok
 *
 * url variable
 *      -- host => baidu.com
 *      -- protocol => https
 *      -- port => null
 *      -- params => {key2: "value2", query: "no"}
 *      -- path => index.php
 *      -- query => query=ok
 *      -- sourceUrl => https://baidu.com/index.php?query=ok
 *      -- url => https://baidu.com/index.php
 */
```

**script用法**
```js
window.onload = function () {
    var url = new lifLib.Url('/index.php?query=ok');
    console.log(url);
}
```
