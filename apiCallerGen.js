const fs = require("fs");
const { dataTypeConvert, getType, isBasicType } = require("./dataTypeConvert");

function apiCallerGen(swaggerData, outputDir) {

    var apiFileList = {};
    var apiFileImportList = {};
    for (var apiUrlItem in swaggerData.paths) {
        if (!swaggerData.paths.hasOwnProperty(apiUrlItem)) {
            continue;
        }
        var actionName = apiUrlItem;
        var pathValue = swaggerData.paths[apiUrlItem];
        // console.log(apiUrlItem)
        for (var httpMethodItem in pathValue) {
            if (!pathValue.hasOwnProperty(httpMethodItem)) {
                continue;
            }
            var elvalue = pathValue[httpMethodItem];
            var fileName = elvalue.tags[0];
            if (!apiFileList.hasOwnProperty(fileName)) {
                apiFileList[fileName] = `import instance from "@/plugins/axios";\r\n`;
            }

            var pathQuery = '';
            var queryParamExists = false;
            if (elvalue.hasOwnProperty('parameters')) {
                for (let index = 0; index < elvalue.parameters.length; index++) {
                    const queryParameter = elvalue.parameters[index];
                    if (queryParameter.in === "path") {
                        actionName = actionName.replace(`/{${queryParameter.name}}`, `${queryParameter.name}`).replace(`{${queryParameter.name}}`, `${queryParameter.name}`);
                        pathQuery += `${queryParameter.name}:${dataTypeConvert(getType(queryParameter.schema))}`;
                        apiUrlItem = apiUrlItem.replace(`\${${queryParameter.name}}`,`{${queryParameter.name}}`).replace(`{${queryParameter.name}}`, '${' + queryParameter.name + '}');
                    } else if (queryParameter.in === "query") {
                        queryParamExists = true;
                    }
                }
            }

            var requestDataStr = '';
            if (elvalue.hasOwnProperty('requestBody')) {
                var requestBody = elvalue.requestBody;
                var dataType = getType(requestBody.content['application/json'].schema);
                requestDataStr = `data:${dataType}`;
                var modelName = dataType.split('<').pop().split('>').shift();
                if (!apiFileImportList.hasOwnProperty(fileName)) {
                    apiFileImportList[fileName] = {};
                }
                if (!apiFileImportList[fileName].hasOwnProperty(modelName)) {
                    apiFileImportList[fileName][modelName]='';
                }
                if (!isBasicType(modelName)) {
                    apiFileImportList[fileName][modelName] = `import ${modelName} from './models/${modelName}';\r\n`;
                }
            }

            actionName = actionName.split('/').pop();
            apiFileList[fileName] += `/**
* ${elvalue?.summary ?? actionName}
*/
export async function ${httpMethodItem}${actionName}(${pathQuery ? `${pathQuery},` : ''}${queryParamExists ? 'params:any,' : ''}${requestDataStr ? requestDataStr : ''}`;
            if (apiFileList[fileName][apiFileList[fileName].length - 1] == ',') {
                apiFileList[fileName] = apiFileList[fileName].substring(0, apiFileList[fileName].length - 1);
            }
            apiFileList[fileName] += `)`;

            if (elvalue.hasOwnProperty('responses')) {
                var responses = elvalue.responses;
                if (responses.hasOwnProperty('200') && responses['200'].hasOwnProperty('content') && responses['200'].content.hasOwnProperty('application/json')) {
                    var responseType = getType(responses['200'].content['application/json'].schema);
                    apiFileList[fileName] += `:Promise<${responseType}>`;

                    var modelName = responseType.split('<').pop().split('>').shift();
                    if (!apiFileImportList.hasOwnProperty(fileName)) {
                        apiFileImportList[fileName] = {};
                    }
                    if (!apiFileImportList[fileName].hasOwnProperty(modelName)) {
                        apiFileImportList[fileName][modelName]='';
                    }
                    if (!isBasicType(modelName)) {
                        apiFileImportList[fileName][modelName] = `import ${modelName} from './models/${modelName}';\r\n`;
                    }
                }
            }
            apiFileList[fileName] += `{\r\n`;
            apiFileList[fileName] += `  return await instance({
        url: \`${apiUrlItem}\`,
        method: '${httpMethodItem}',${queryParamExists ? '\r\nparams:params,' : ''}${requestDataStr ? '\r\ndata:data,' : ''}
    });\r\n`;
            apiFileList[fileName] += `}\r\n`;
        }
    }

    for (const fileName in apiFileList) {
        if (!apiFileList.hasOwnProperty(fileName)) {
            continue;
        }
        if (apiFileImportList.hasOwnProperty(fileName)) {
            for (const modelName in apiFileImportList[fileName]) {
                if (!apiFileImportList[fileName].hasOwnProperty(modelName)) {
                    continue;
                }
                apiFileList[fileName] = apiFileImportList[fileName][modelName] + apiFileList[fileName];
            }
        }
        fs.writeFileSync(`${outputDir}/${fileName}.ts`, apiFileList[fileName]);
    }
    console.log('API files generated successfully!');
}

module.exports = {
    apiCallerGen,
};