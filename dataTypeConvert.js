function dataTypeConvert(dataType) {
  if (dataType == "integer") {
    return "number";
  }
  if (dataType == "datetime") {
    return "Date";
  }
  if (dataType == "array") {
    return "Array";
  }
  return dataType;
}

function getType(schema) {
    if (schema.hasOwnProperty('type')) {
        if (schema.type == 'array') {
            return `Array<${getType(schema.items)}>`;
        }
        return dataTypeConvert(schema.type);
    }
    if (schema.hasOwnProperty('$ref')) {
        return schema['$ref'].split('/').pop();
    }
}

function isBasicType(type) {
  return ["string", "number", "boolean", "object", "array"].includes(type);
}

module.exports = {
  dataTypeConvert,
  getType,
  isBasicType
};
