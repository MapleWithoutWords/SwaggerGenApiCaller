function dataTypeConvert(dataType, format = null) {
  if (!dataType){
    return { type: "any", defaultValue: null };
  }
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
  if (dataType?.startsWith("Array<") ) {
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
      if(schema.items.oneOf){
        return `Array<${getType(schema.items.oneOf[0])}>`;
      }
      return `Array<${getType(schema.items)}>`;
    }
    var type = dataTypeConvert(schema.type, schema.format).type
    return type;
  }
  if (schema.hasOwnProperty('$ref')) {
    return schema['$ref'].split('/').pop();
  }
  
  if(schema?.oneOf){
    return schema.oneOf.map(e=>e['$ref'].split('/').pop()).join('|');
  }
}

function isBasicType(type) {
  return ["string", "number", "boolean", "object", "array", "Date","any"].includes(type);
}

module.exports = {
  dataTypeConvert,
  getType,
  isBasicType
};
