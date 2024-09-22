const { dataTypeConvert, getType, isBasicType } = require("./dataTypeConvert");
const fs = require("fs");

function dataModelGen(swaggerData, modelDir) {
    var fileContentStringBuilder = "";
    for (const dtoName in swaggerData.components.schemas) {
        const element = swaggerData.components.schemas[dtoName];

        if (element.hasOwnProperty("properties")) {
            fileContentStringBuilder += `export class ${dtoName}{\r\n`;
            for (const propertyName in element.properties) {
                if (!element.properties.hasOwnProperty(propertyName)) {
                    continue;
                }
                const propertyValue = element.properties[propertyName];
                var type = propertyValue.type;
                if (propertyValue.hasOwnProperty('$ref')) {
                    type = propertyValue['$ref'].split('/').pop();
                } else if (type == 'array') {
                    type = getType(propertyValue.items)
                    type = `Array<${type}>`;
                }
                var dataTypeObj = dataTypeConvert(type, propertyValue.format);
                fileContentStringBuilder += `  ${propertyName}${dataTypeObj.defaultValue ? '' : '?'}: ${dataTypeObj.type}${dataTypeObj.defaultValue ? `=${dataTypeObj.defaultValue}` : ''};\r\n`;
            }
            fileContentStringBuilder += "}\r\n";

        } else {
            fileContentStringBuilder += `export enum ${dtoName}{\r\n`;
            try {
                var menuData = JSON.parse(element.description);
                for (const menuName in menuData) {
                    if (menuData.hasOwnProperty(menuName)) {
                        const element = menuData[menuName];
                        fileContentStringBuilder += `  ${menuName} = ${element},\r\n`;
                    }
                }
                fileContentStringBuilder += "}\r\n";
            } catch (error) {
                console.log(error)
                return;
            }
        }
    }
    var filePath = `${modelDir}/data-contracts.ts`;
    fs.writeFileSync(filePath, fileContentStringBuilder);
    console.log("Data Model Generated Successfully!");
}


module.exports = {
    dataModelGen,
};