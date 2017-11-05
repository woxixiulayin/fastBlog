interface IAjaxReturn {
    statusCode: number,
    message: string,
    data: object,
}

function reply200 ({
    msg = 'ok',
    data = null,
}: {
    msg?: string,
    data?: object
} = {}): IAjaxReturn {
    return {
    statusCode: 200,
    message: msg,
    data
}}

const shapeError = (statusCode: number): Function => (message: string): IAjaxReturn => ({
    statusCode,
    message,
    data: null
})

const replyErrors = {
    // Bad Request: 客户端请求的语法错误，服务器无法理解
    code400: shapeError(400),
    // Unauthorized: 请求要求用户的身份认证
    code401: shapeError(401),
    // Unauthorized: 请求要求用户的身份认证
    code403: shapeError(403),
    // checkUserLogin: 服务器无法根据客户端的请求找到资源（网页
    code404: shapeError(404),
    // 	Internal Server Error: 服务器内部错误，无法完成请求
    code500: shapeError(500)
}

export {
    IAjaxReturn,
    reply200,
    replyErrors,
}