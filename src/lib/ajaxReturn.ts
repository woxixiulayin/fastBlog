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
    code400: shapeError(400),
    code401: shapeError(401),
    code500: shapeError(500)
}

export {
    IAjaxReturn,
    reply200,
    replyErrors,
}