const { dataTypeConvert } = require("./dataTypeConvert");
const fs = require("fs");

function dataModelGen(swaggerData, modelDir) {
    for (const dtoName in swaggerData.components.schemas) {
        if (!Object.prototype.hasOwnProperty.call(swaggerData.components.schemas, dtoName)) {
            continue;
        }

        const element = swaggerData.components.schemas[dtoName];
        var filePath = `${modelDir}/${dtoName}.ts`;
        if (Object.prototype.hasOwnProperty.call(element, "properties")) {
            var fileContent = `export default class ${dtoName}{\r\n`;
            for (const propertyName in element.properties) {
                if (!Object.prototype.hasOwnProperty.call(element.properties, propertyName)) {
                    continue;
                }
                const propertyValue = element.properties[propertyName];
                var type = propertyValue.type;
                if (Object.prototype.hasOwnProperty.call(propertyValue, '$ref')) {
                    type = propertyValue['$ref'].split('/').pop();
                    fileContent = `import {${type}} from './${type}';\r\n${fileContent}`;
                } else if (type == 'array') {
                    if (Object.prototype.hasOwnProperty.call(propertyValue.items, '$ref')) {
                        type = propertyValue.items['$ref'].split('/').pop();
                        fileContent = `import {${type}} from './${type}';\r\n${fileContent}`;
                        type = `Array<${type}>`;
                    } else {
                        type = `Array<${dataTypeConvert(propertyValue.items.type)}>`;
                    }
                }
                fileContent += `  ${propertyName}: ${dataTypeConvert(type)};\r\n`;
            }
            fileContent += "}";
            fs.writeFileSync(filePath, fileContent);
        } else {
            var fileContent = `export default enum ${dtoName}{\r\n`;
            var menuData = JSON.parse(element.description);
            for (const menuName in menuData) {
                if (Object.prototype.hasOwnProperty.call(menuData, menuName)) {
                    const element = menuData[menuName];
                    fileContent += `  ${menuName} = ${element},\r\n`;
                }
            }
            fileContent += "}";
            fs.writeFileSync(filePath, fileContent);
        }
    }
    console.log("Data Model Generated Successfully!");
}


module.exports = {
    dataModelGen,
};