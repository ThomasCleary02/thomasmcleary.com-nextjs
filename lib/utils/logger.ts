// Create a production-safe logger
export const logger = {
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, error);
    }
    // In production, could send to error tracking service
  },
  
  warn: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message);
    }
  },
  
  info: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message);
    }
  }
};
