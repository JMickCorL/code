module.exports = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 401 && data.error === 'Token no válido') {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }
};
