function handleError(err, req, res, next) {
  console.error(err.stack); // Log the error stack for debugging

  // Map specific errors to appropriate HTTP status codes and messages
  const errorMap = {
    ValidationError: { status: 400, message: "Bad request: Validation error" },
    CastError: { status: 400, message: "Bad request: Invalid ID format" }, // Handle invalid object IDs
    MongoError: {
      status: 500,
      message: "Internal server error: Database issue",
    }, // Generic database error
    // Add more specific error mappings as needed (e.g., authentication errors)
  };

  let errorData = { status: 500, message: "Internal server error" }; // Default error

  // Check if the error is mapped and provide a more specific response
  if (errorMap[err.name]) {
    errorData = errorMap[err.name];
  } else if (err.message) {
    // Include error message if available
    errorData.message = err.message;
  }

  res.status(errorData.status).json(errorData);
}
module.exports = handleError;
