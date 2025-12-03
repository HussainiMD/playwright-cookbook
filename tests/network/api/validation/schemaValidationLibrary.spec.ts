/*
Ensure you have these NPM modules in project: 
npm install ajv @types/ajv --save 
npm install ajv-formats --save 
P.N: ajv-formats is for support of email, url, hostname
*/

import {test, expect, APIResponse} from "@playwright/test";
import {Ajv} from "ajv";
import formatsPlugin from "ajv-formats";

/*configuring validator to do STRICT checking and log all errors to CONSOLE */
let ajvValidator: Ajv = new Ajv({logger: console, allErrors: true, strict: true});
ajvValidator = formatsPlugin(ajvValidator);

const pageNum:number = 2;

test('validate response with AJV', async ({page, request}) => {    
    const apiResponse: APIResponse = await request.get(`https://reqres.in/api/users?page=${pageNum}`, {
        headers: {
            'x-api-key': 'reqres-free-v1'
        }
    });
    
    expect(apiResponse.status()).toBe(200);
    const apiResponseObj:APIResonseObjectType = await apiResponse.json();
    
    /*here we use AJV to validate response against schema*/
    expect(ajvValidator.validate(usersSchema, apiResponseObj)).toEqual(true) ;

    expect(apiResponseObj.page).toBe(pageNum);
    expect(apiResponseObj.data).toEqual(expect.any(Array));//all JSON data types can be verified like this
})

/*Expected format of API response */
interface APIResonseObjectType {
    page: Number,
    data: Array<any>,
    [key: string]: any //this means that we do NOT care of any other keys apart from above two specified
}

/*FULL response JSON schema for validation*/
/*Tool used to generate: https://app.quicktype.io/ */
const usersSchema: Object = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/Welcome",
  "definitions": {
    "Welcome": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "page": {
          "type": "integer"
        },
        "per_page": {
          "type": "integer"
        },
        "total": {
          "type": "integer"
        },
        "total_pages": {
          "type": "integer"
        },
        "data": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Datum"
          }
        },
        "support": {
          "$ref": "#/definitions/Support"
        },
        "_meta": {
           "$ref": "#/definitions/Meta"
        }
      },
      "required": [
        "data",
        "page",
        "per_page",
        "support",
        "total",
        "total_pages"
      ],
      "title": "Welcome"
    },
    "Datum": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "integer"
        },
        "email": {
          "type": "string",
          "format": "email"
        },
        "first_name": {
          "type": "string"
        },
        "last_name": {
          "type": "string"
        },
        "avatar": {
          "type": "string",
          "format": "uri"
        }
      },
      "required": [
        "avatar",
        "email",
        "first_name",
        "id",
        "last_name"
      ],
      "title": "Datum"
    },
    "Support": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "url": {
          "type": "string",
          "format": "uri"
        },
        "text": {
          "type": "string"
        }
      },
      "required": [
        "url",
        "text"
      ],
      "title": "Support"
    },
  "Meta": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "powered_by": {
                    "type": "string"
                },
                "upgrade_url": {
                    "type": "string"
                },
                "docs_url": {
                    "type": "string"
                },
                "template_gallery": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                },
                "features": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "upgrade_cta": {
                    "type": "string"
                }
            },
            "required": [
                "docs_url",
                "features",
                "message",
                "powered_by",
                "template_gallery",
                "upgrade_cta",
                "upgrade_url"
            ],
            "title": "Meta"
        }
    }
}
