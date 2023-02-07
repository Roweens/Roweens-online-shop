const { Basket, BasketDevice, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async addToBasket(req, res) {
    const { userId, deviceId } = req.body;

    const candidate = await BasketDevice.findOne({
      where: { deviceId, basketId: userId },
    }).then(async (record) => {
      if (!record) {
        const basketDevice = await BasketDevice.create({
          deviceId,
          basketId: userId,
          quantity: 1,
        });
        return;
      }
      return await record.update({ quantity: record.quantity + 1 });
    });

    return res.json(candidate);
  }

  async deleteFromBasket(req, res) {
    const { userId, deviceId } = req.body;
    const { completeDelete } = req.query;
    const candidate = await BasketDevice.findOne({
      where: { deviceId, basketId: userId },
    }).then(async (record) => {
      if (record.dataValues.quantity === 1 || completeDelete) {
        return await record.destroy();
      }
      console.log('updated');
      return await record.update({ quantity: record.quantity - 1 });
    });

    return res.json(candidate);
  }

  async getBasket(req, res) {
    const { userId } = req.query;

    const basket = await Basket.findOne({
      where: { userId },
      include: [{ model: BasketDevice, as: 'basket_items' }],
    });
    return res.json(basket);
  }
}

module.exports = new BasketController();
