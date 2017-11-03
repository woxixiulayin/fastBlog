interface IAjaxReturn {
    statusCode: number,
    message: string,
    data: object,
}

const reply200: (param?: {
    msg?: string,
    data?: object
}) => IAjaxReturn = ({
    msg = 'ok',
    data = null,
}): IAjaxReturn => ({
    statusCode: 200,
    message: msg,
    data
})

const replyErrors = {
    code200: (msg): IAjaxReturn => ({ statusCode: 200, message: msg, data: null }),
    code400: (msg): IAjaxReturn => ({ statusCode: 200, message: msg, data: null }),
    code500: (msg): IAjaxReturn => ({ statusCode: 200, message: msg, data: null }),
}

export {
    IAjaxReturn,
    reply200,
    replyErrors,
}