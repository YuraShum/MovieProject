

const responseWidthData = (response, statusCode, data) => {
    return response.status(statusCode).json(data)
}
const responseHandlers = {
    error: (response) => {
        return responseWidthData(
            response,
            500,
            {
                status: 500,
                message: 'Something went wrong'
            }
        )
    },
    created: (response, data) => {
        return responseWidthData(response, 200, data)
    },
    unauthorize: (response) => {
        return responseWidthData(
            response,
            401,
            {
                status: 401,
                message: "Unauthorized access"
            })
    },
    notFound: (response) => {
        return responseWidthData(
            response,
            404,
            {
                status: 404,
                message: 'Not found'
            }
        )
    },
    badRequest: (response, message) => {
        return responseWidthData(
            response,
            400,
            {
                status: 400,
                message
            }
        )
    },
    ok: (response, data) => {
        return responseWidthData(response, 200, data
        )
    }
}

export default responseHandlers