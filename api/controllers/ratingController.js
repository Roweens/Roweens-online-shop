const { Rating } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
  async create(req, res) {
    const { deviceId, userId, rate } = req.body;

    const rating = await Rating.create({
      deviceId,
      userId,
      rate,
    });

    return res.json(rating);
  }
}

module.exports = new RatingController();
