const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const { userId, messageType, message } = JSON.parse(event.body);

    // 保存用户通知记录到 DynamoDB
    await dynamoDB.put({
        TableName: process.env.TABLE_NAME,
        Item: {
            userId,
            messageType,
            message,
            timestamp: new Date().toISOString()
        }
    }).promise();

    // 根据通知类型发送通知
    switch (messageType) {
        case 'email':
            // 发送电子邮件逻辑
            break;
        case 'sms':
            // 发送短信逻辑
            break;
        case 'push':
            // 发送推送通知逻辑
            break;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: '通知已发送' })
    };
};
