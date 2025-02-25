const { dataTypeConvert, getType, isBasicType } = require("./dataTypeConvert");
const fs = require("fs");

function dataModelGen(swaggerData, modelDir) {

    var fileContentObject = [];

    for (const dtoName in swaggerData.components.schemas) {
        var element = swaggerData.components.schemas[dtoName];
        var fileContentStringBuilder = "";
        var order = 1;
        if (element.hasOwnProperty("properties") || element.hasOwnProperty('allOf')) {
            if (element.hasOwnProperty('allOf') && element['allOf'].length >= 2) {
                fileContentStringBuilder += `export type ${dtoName} = ${getType(element['allOf'][0])} & {\r\n`;
                element = element['allOf'][1]
                console.log(element)
                order += element['allOf']?.length??1;
            } else {
                fileContentStringBuilder += `export type ${dtoName} = {\r\n`;
            }

            if (element.properties) {
                for (const propertyName in element.properties) {
                    if (!element.properties.hasOwnProperty(propertyName)) {
                        continue;
                    }
                    const propertyValue = element.properties[propertyName];
                    var type = getType(propertyValue);
                    if (type == 'object') {
                        type = `Record<string, ${propertyValue?.additionalProperties?.type ?? 'object'}>`;
                        // order++;
                    }
                    if (!isBasicType(type) && type !== 'Array<string>') {
                        order++;
                    }
                    var dataTypeObj = dataTypeConvert(type, propertyValue.format);
                    fileContentStringBuilder += `  ${propertyName}${propertyName.endsWith('Id') || !dataTypeObj.defaultValue ? '?' : ''}: ${dataTypeObj.type};\r\n`;
                }
            }
            fileContentStringBuilder += "}\r\n";

        }else if(element.hasOwnProperty("type")&&element["type"]=="object"){
            fileContentStringBuilder += `export type ${dtoName} = {\r\n}\r\n`;
        }else {
            order = 0;
            fileContentStringBuilder += `export enum ${dtoName} {\r\n`;
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
                console.log(element, dtoName)
                console.log(error)
                return;
            }
        }

        fileContentObject.push({ order: order, content: fileContentStringBuilder })
    }
    var filePath = `${modelDir}/data-contracts.ts`;

    var fileContent = '';
    for (const element of fileContentObject.sort((a, b) => a.order - b.order)) {
        fileContent += element.content;
    }

    fs.writeFileSync(filePath, fileContent);
    console.log("Data Model Generated Successfully!");
}


module.exports = {
    dataModelGen,
};