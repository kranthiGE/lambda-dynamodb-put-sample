'use strict'

var AWS = require("aws-sdk")

var uuid = require("uuid")

const docClient = new AWS.DynamoDB.DocumentClient()

const groups_table = process.env.GROUPS_TABLE

exports.handler = async (event) => {

    console.log(`input object ${event}`)

    const itemId = uuid.v4()

    const parsedBody = JSON.parse(event.body)

    const new_item = {
        id: itemId,
        ...parsedBody
    }

    await docClient.put({
        TableName: groups_table,
        Item: new_item
    }).promise()

    let response;

    response = {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            new_item
        }),
    };

    return response;
};
