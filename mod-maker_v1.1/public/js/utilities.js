// utilities.js
class Utilities {
static jsonToIni(jsonObject) { // Json형태의 data를 INI 형태로 변환함
let ini = '';

    function writeKeyValuePairs(sectionName, keyValuePairs) {
        ini += `[${sectionName}]\n`; //sectionName은 따로 섹션으로 분리함
        keyValuePairs.forEach((keyValuePair) => {
            const key = Object.keys(keyValuePair)[0];
            const value = keyValuePair[key];
            if (typeof value === 'object') {
                jsonToIniHelper(value, `${sectionName}.${key}`);
            } else {
                ini += `${key} = ${value}\n`;
            }
        });
        ini += '\n';
    }

    function jsonToIniHelper(obj, sectionName) {
        if (Array.isArray(obj)) {
            writeKeyValuePairs(sectionName, obj);
        } else {
            for (const [key, value] of Object.entries(obj)) {
                if (Array.isArray(value)) {
                    jsonToIniHelper(value, key);
                } else {
                    ini += `${key} = ${value}\n`;
                } 
            }
        }
    }

    for (const sectionName in jsonObject) {
        jsonToIniHelper(jsonObject[sectionName], sectionName);
    }

    return ini;
}
}