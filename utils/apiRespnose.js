class ApiResponse {
  success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({ message, data });
  }

  error(res, message = "Internal Server Error", errorStack, statusCode = 500) {
    if (errorStack) {
      return res.status(statusCode).json({ message });
    }
    return res.status(statusCode).json({ message, error: errorStack });
  }
}

export default new ApiResponse();
