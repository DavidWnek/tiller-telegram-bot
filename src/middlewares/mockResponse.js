const { MOCK_RESPONSES = false } = process.env;

export const mockResponse = async (req, res, next) => {
  if (!MOCK_RESPONSES || MOCK_RESPONSES === 'false') {
    next();
    return;
  }

  if (req.query.mockStatusCode) {
    res.status(req.query.mockStatusCode);
  }

  next();
};
