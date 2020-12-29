export default class Verify {
    constructor (rules) {
        this.error = {};
        this.rules = {};
        this.errorMessage = null;

        for (const ruleKey in rules) {
            this.error[ruleKey] = rules[ruleKey].error;
            delete rules[ruleKey].error;

            // 检查error
            for (const validator in rules[ruleKey]) {
                if (!(validator in this.error[ruleKey])) throw new Error(`Please set ${ruleKey} rule, ${validator} error handle`);
            }
        }

        this.rules = rules;
    }

    checkParams (checkVal, result = {}) {
        for (const param in checkVal) {
            if (!(param in this.rules)) throw new Error(`Please register the rule for ${param}`);

            const val = checkVal[param];
            for (const validator in this.rules[param]) {
                const ok = Verify.validator[validator].call(this, val, this.rules[param][validator]);
                if (!ok) {
                    this.errorMessage = this.error[param][validator];
                    return false;
                }
            }
        }

        return true;
    }

    getErrorMessage () {
        return this.errorMessage;
    }

    trim (val) {
        if (this.isStr(val)) {
            return val.trim();
        }
        return val;
    }

    // -----------------TYPE VERIFY--------------------
    isFun (select) {
        return typeof select === 'function';
    };

    isArr (select) {
        return select instanceof Array;
    };

    isLikeArr (select) {
        if (!select) return false;
        return typeof select !== 'string' &&
            typeof select !== 'number' &&
            typeof select !== 'function' &&
            select !== window &&
            (select instanceof Array || typeof select.length !== 'undefined') &&
            select.length > 0;
    };

    isObj (select) {
        return typeof select === 'object' && select !== null;
    };

    isStr (select) {
        return typeof select === 'string';
    };

    isNum (select) {
        return typeof select === 'number';
    };

    isLikeNum (select) {
        return select === Number(select);
    };

    isBoo (select) {
        return typeof select === 'boolean';
    };

    isUnd (select) {
        return typeof select === 'undefined';
    };

    isNaN (select) {
        return typeof select === 'number' && select.toString() === 'NaN';
    };

    isNode (select) {
        return select.nodeType === 1;
    };
}

Verify.instance = null;
Verify.registerRule = (rules = {}) => {
    if (Verify.instance === null) {
        Verify.instance = new Verify(rules);
    }

    return Verify.instance;
};

Verify.String = 1;
Verify.Number = 2;
Verify.Array = 3;
Verify.Boolen = 4;
Verify.Undefined = 5;
Verify.NaN = 6;

// 默认插件
Verify.validator = {
    type (checkVal, ruleVal) {
        switch (ruleVal) {
        case Verify.String:
            return this.isStr(checkVal);
        case Verify.Number:
            return this.isNum(checkVal);
        case Verify.Array:
            return this.isArr(checkVal);
        case Verify.Boolen:
            return this.isBoo(checkVal);
        case Verify.NaN:
            return this.isNaN(checkVal);
        case Verify.Undefined:
            return this.isUnd(checkVal);
        default:
            throw new Error('Unknown type');
        }
    },
    regex (checkVal, ruleVal) {
        if (!(ruleVal instanceof RegExp)) {
            throw new Error('Please use RegExp');
        }
        return ruleVal.test(checkVal.toString());
    },
    min (checkVal, ruleVal) {
        if (this.isNum(checkVal)) {
            return checkVal >= ruleVal;
        }
        // 其他类型则转换为string, 并且对比长度
        return checkVal.toString().length >= ruleVal;
    },
    max (checkVal, ruleVal) {
        if (this.isNum(checkVal)) {
            return checkVal <= ruleVal;
        }
        // 其他类型则转换为string, 并且对比长度
        return checkVal.toString().length <= ruleVal;
    }
};

// 方便以后扩展插件
Verify.extend = (name, validator) => {
    Verify.validator[name] = validator;
};
