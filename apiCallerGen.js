const fs = require("fs");
const { getType, isBasicType } = require("./dataTypeConvert");

function apiCallerGen(swaggerData, outputDir) {

    var apiFileList = {};
    var apiFileImportList = {};
    for (var apiUrlItem in swaggerData.paths) {
        var actionName = apiUrlItem;
        var pathValue = swaggerData.paths[apiUrlItem];

        for (var httpMethodItem in pathValue) {
            var elvalue = pathValue[httpMethodItem];
            var fileName = elvalue.tags[0];

            if (!apiFileList.hasOwnProperty(fileName)) {
                apiFileList[fileName] = `export class ${fileName}{\r\n`;
            }
            if (!apiFileImportList.hasOwnProperty(fileName)) {
                apiFileImportList[fileName] = [];
            }

            var pathQueries = [];
            var queryParams = [];
            if (elvalue.hasOwnProperty('parameters')) {
                for (let index = 0; index < elvalue.parameters.length; index++) {
                    const queryParameter = elvalue.parameters[index];
                    var datatype = getType(queryParameter.schema);
                    if (queryParameter.in === "path") {
                        pathQueries.push(`${queryParameter.name}:${datatype}`);
                        apiUrlItem = apiUrlItem.replace(`\${${queryParameter.name}}`, `{${queryParameter.name}}`).replace(`{${queryParameter.name}}`, '${' + queryParameter.name + '}');
                        actionName = actionName.replace(`/{${queryParameter.name}}`, `${queryParameter.name}`).replace(`{${queryParameter.name}}`, `${queryParameter.name}`);
                    } else if (queryParameter.in === "query") {
                        queryParams.push(`${queryParameter.name}?:${datatype}`)
                    }
                }
            }

            var requestDataStr = '';
            if (elvalue.hasOwnProperty('requestBody')) {
                var requestBody = elvalue.requestBody;
                var dataType = getType(requestBody.content['application/json'].schema);
                requestDataStr = `data:${dataType}`;
                var modelName = dataType.split('<').pop().split('>').shift();
                if (!isBasicType(modelName)) {
                    if (!apiFileImportList[fileName].includes(modelName)) {
                        apiFileImportList[fileName].push(modelName);
                    }
                }
            }

            actionName = actionName.split('/').pop();
            var functionString = `
    /**
    * ${elvalue.summary ?? actionName}
    */
    static async ${httpMethodItem}${actionName}(${pathQueries.length > 0 ? `${pathQueries.join(',')},` : ''} ${queryParams.length > 0 ? `query:{\r\n${queryParams.join(",\r\n")}\r\n},` : ''} ${requestDataStr ? `${requestDataStr},` : ''}`;

            if (functionString[functionString.length - 1] == ',') {
                functionString = functionString.substring(0, functionString.length - 1);
            }
            functionString += `)`;

            if (elvalue.hasOwnProperty('responses')) {
                var responses = elvalue.responses;
                if (responses.hasOwnProperty('200')) {

                    if (responses['200'].hasOwnProperty('content') && responses['200'].content.hasOwnProperty('application/json')) {
                        var responseType = getType(responses['200'].content['application/json'].schema);
                        functionString += `:Promise<${responseType}>{\r\n`;

                        var modelName = responseType.split('<').pop().split('>').shift();
                        if (!isBasicType(modelName)) {
                            if (!apiFileImportList[fileName].includes(modelName)) {
                                apiFileImportList[fileName].push(modelName);
                            }
                        }
                    }else {
                        functionString += `:Promise<void>{\r\n`;
                    }
                }
            }

            functionString += `
        return await instance({
        url: \`${apiUrlItem}\`,
        method: '${httpMethodItem}',
        ${queryParams.length > 0 ? 'params:query,' : ''}
        ${requestDataStr ? 'data:data,' : ''}
        });\r\n`;
            functionString += `    }\r\n`;

            apiFileList[fileName] += functionString;
        }
    }

    for (const fileName in apiFileList) {
        if (!apiFileList.hasOwnProperty(fileName)) {
            continue;
        }
        if (apiFileImportList.hasOwnProperty(fileName) && apiFileImportList[fileName].length > 0) {
            apiFileList[fileName] = `import { ${apiFileImportList[fileName].join(',')}} from './models/data-contracts'\r\n` + apiFileList[fileName];
        }
        apiFileList[fileName] = `import instance from "@/plugins/axios";\r\n` + apiFileList[fileName] + "}";
        fs.writeFileSync(`${outputDir}/${fileName}.ts`, apiFileList[fileName]);
    }
    console.log('API files generated successfully!');
}

module.exports = {
    apiCallerGen,
};