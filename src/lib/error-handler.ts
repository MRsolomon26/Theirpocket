export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(
    statusCode: number,
    message: string,
    details?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: unknown): {
  statusCode: number;
  message: string;
  details?: unknown;
} {
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.error('API Error:', error);
    return {
      statusCode: 500,
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : error.message,
    };
  }

  // eslint-disable-next-line no-console
  console.error('Unknown error:', error);
  return {
    statusCode: 500,
    message: 'An unexpected error occurred',
  };
}

export async function withErrorHandler<T>(
  handler: () => Promise<T>
): Promise<{ data: T; error: null } | { data: null; error: { statusCode: number; message: string; details?: unknown } }> {
  try {
    const data = await handler();
    return { data, error: null };
  } catch (error) {
    const errorResponse = handleApiError(error);
    return { data: null, error: errorResponse };
  }
}
