module.exports = (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
    status: 'Server is running',
    endpoints: {
      landing: '/api/landing',
      carDetails: '/api/cars/[id]'
    }
  });
};