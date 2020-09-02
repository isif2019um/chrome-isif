// ajv validator. rules for the domains status 
var ajv = new Ajv({allErrors: true}); // options can be passed, e.g. {allErrors: true}
var schemaForRegCheck ={
  "type": "number",
  "minimum": 10,
  "additionalProperties": false,
  "errorMessage": 'this is a custom error messages'
}

var validate = ajv.compile(schemaForRegCheck);
var checkData = 8;
var valid = validate(checkData);
if (!valid) console.log(validate.errors);
