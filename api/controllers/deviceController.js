const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo, Rating } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Sequelize } = require('../db');

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;

      let fileName = uuid.v4() + '.jpg';

      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;

    page = page;
    limit = limit || 2;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const { user } = req.query;

    let userRating;
    if (user) {
      userRating = await Rating.findOne({
        where: { userId: user },
      });
    }

    const rating = await Rating.findAll({
      where: { deviceId: id },
    });

    const avgRating = rating.reduce((acc, rate, i, array) => {
      acc += rate.dataValues.rate;
      return Math.ceil(acc / array.length);
    }, 0);

    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    res.set('Access-Control-Expose-Headers', 'is_rated');
    res.set('is_rated', userRating ? 1 : 0);
    device.setDataValue('rating', avgRating);

    return res.json(device);
  }
}

module.exports = new DeviceController();
