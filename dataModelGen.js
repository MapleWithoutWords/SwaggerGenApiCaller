const { dataTypeConvert, getType, isBasicType } = require("./dataTypeConvert");
const fs = require("fs");

function dataModelGen(swaggerData, modelDir) {

    var fileContentObject=[];

    for (const dtoName in swaggerData.components.schemas) {
        var element = swaggerData.components.schemas[dtoName];
        var fileContentStringBuilder = "";
        var order=1;

        if (element.hasOwnProperty("properties") || element.hasOwnProperty('allOf')) {

            if (element.hasOwnProperty('allOf')&&element['allOf'].length>=2) {
                fileContentStringBuilder += `export class ${dtoName} extends ${getType(element['allOf'][0])}{\r\n`;
                element=element['allOf'][1]
                order++;
            }else{
                fileContentStringBuilder += `export class ${dtoName}{\r\n`;
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
                    }
                    var dataTypeObj = dataTypeConvert(type, propertyValue.format);
                    fileContentStringBuilder += `  ${propertyName}${dataTypeObj.defaultValue ? '' : '?'}: ${dataTypeObj.type}${dataTypeObj.defaultValue ? `=${dataTypeObj.defaultValue}` : ''};\r\n`;
                }
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

        fileContentObject.push({order:order,content:fileContentStringBuilder})
    }
    var filePath = `${modelDir}/data-contracts.ts`;

    var fileContent='';
    for (const element of fileContentObject.sort((a, b) => a.order - b.order)) {
        fileContent+=element.content;
    }

    fs.writeFileSync(filePath, fileContent);
    console.log("Data Model Generated Successfully!");
}


module.exports = {
    dataModelGen,
};