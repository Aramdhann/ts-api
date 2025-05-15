export const createResponse = <T extends object | null>(
  status: number,
  message: string,
  data?: T,
) => {
  return {
    status,
    message,
    data,
  };
};
