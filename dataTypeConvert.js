function dataTypeConvert(dataType, format = null) {
  if (dataType == "integer") {
    if (format == "int64") {
      return { type: "string", defaultValue: "'0'" };
    }
    return { type: "number", defaultValue: "0" };
  }
  if (dataType == "string" && format == 'date-time') {
    return { type: "Date", defaultValue: "new Date()" };
  }
  if (dataType == "array") {
    return { type: "Array", defaultValue: "[]" };
  }
  if (dataType.startsWith("Array<") ) {
    return { type: dataType, defaultValue: "[]" };
  }
  if (dataType == "boolean") {
    return { type: "boolean", defaultValue: 'true' };
  }
  if (dataType == "object") {
    return { type: "object", defaultValue: "{}" };
  }
  if (dataType == "string") {
    return { type: "string", defaultValue: "''" };
  }
  return { type: dataType, defaultValue: null };
}

function getType(schema) {
  if (schema.hasOwnProperty('type')) {
    if (schema.type == 'array') {
      return `Array<${getType(schema.items)}>`;
    }
    return dataTypeConvert(schema.type, schema.format).type;
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
