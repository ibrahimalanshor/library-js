const { Rack } = require('../models')
const { RackRepository } = require('../repositories')
const { RackService } = require('../services')

class RackController {

  async get(req, res) {
    try {
      const racks = await RackRepository.get({
        page: req.query.page,
        search: req.query.search
      })

      return res.status(200).json(racks)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async create(req, res) {
    try {
      const rack = await Rack.create(req.body)

      return res.status(200).json(rack)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async find(req, res) {
    try {
      const rack = await RackRepository.find(req.params.rack, {
        page: req.query.page,
        search: req.query.search,
      })

      return res.status(200).json(rack)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async update(req, res) {
    try {
      const rack = await RackService.update(req.params.rack, req.body)

      return res.status(200).json(rack)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async delete(req, res) {
    try {
      const rack = await Rack.findByIdAndDelete(req.params.rack)

      return res.status(200).json(rack)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

}

module.exports = new RackController