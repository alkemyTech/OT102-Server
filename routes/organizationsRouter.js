const express = require('express');

const router = new express.Router();

const hardcodedData = {
  1: {
    name: 'organization1',
    image: 'asd',
    phone: '11111',
    adress: 'adress organization1',
    welcomeText: 'hello world',
  },
  2: {
    name: 'organization2',
    image: 'qwe',
    phone: '2222222',
    adress: 'adress organization2',
    welcomeText: 'hello world',
  },
};

router.get('/:id/public', async (req, res) => {
  const query = hardcodedData[req.params.id];
  try {
    if (query) {
      const response = {
        status: true,
        data: {
          query,
        },
        msg: 'Sucessfull!',
      };
      res.status(200).send(response);
    } else {
      res.status(404).send({ status: false, msg: 'Organization not found' });
    }
  } catch (Error) {
    res.status(500).send({ status: false, data: Error, msg: 'Something was wrong!' });
  }
});
module.exports = router;
