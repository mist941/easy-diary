const handleError = (error: unknown) => {
  console.error(error);
  throw error;
};

export { handleError };
