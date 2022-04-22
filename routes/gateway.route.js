const express = require("express");
const router = express.Router();
const Gateway = require("../models/gateway.model");

// add new gateway
router.post("", (req,
                 res,
                 next) => {
    const gateway = new Gateway({
        serialNumber: req.body.serialNumber,
        name: req.body.name,
        ipv4: req.body.ipv4,
        devices: req.body.devices
    });
    gateway.save().then((createdGateway) => {
        return res.status(201).json({
            message: "gateway created successfully",
            data: {
                _id: createdGateway._id,
                serialNumber: createdGateway.serialNumber,
                name: createdGateway.name,
                devices: createdGateway.devices
            }
        });
    }).catch(err => {
        return res.status(500).json({
            message: "error in create gateway",
            error: err
        });
    });
});

// get list of gateways
router.get("", (req,
                res,
                next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    const gatewayQuery = Gateway.find();
    let fetchedGateways;
    if (pageSize && currentPage) {
        gatewayQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    gatewayQuery.then(documents => {
        fetchedGateways = documents;
        return Gateway.countDocuments();
    }).then(count => {
        return res.status(200).json({
            message: "gateways fetched successfully",
            data: fetchedGateways,
            total: count
        });
    }).catch(err => {
        return res.status(500).json({
            message: "error in fetching gateways",
            error: err
        });
    });
});

// get certain gateway details
router.get("/:id", (req,
                    res,
                    next) => {
    Gateway.findById(req.params.id).then(document => {
        if (document) {
            return res.status(200).json({
                message: "gateway fetched successfully",
                data: document
            });
        } else {
            return res.status(404).json({
                message: "gateway not found"
            });
        }
    }).catch(err => {
        return res.status(500).json({
            message: "error in fetching gateway",
            error: err
        });
    });
});

// delete a gateway
router.delete("/:id", (req,
                       res,
                       next) => {
    Gateway.deleteOne({_id: req.params.id})
        .then(() => {
            return res.status(200).json({
                message: "gateway deleted successfully"
            });
        }).catch(err => {
        return res.status(500).json({
            message: "error in delete gateway",
            error: err
        });
    });
});

// update a gateway
router.put("/:id", (req,
                    res,
                    next) => {
    const id = req.params.id;
    Gateway.findById(id).then(gateway => {
        let data = gateway;
        data.serialNumber = req.body.serialNumber;
        data.name = req.body.name;
        data.ipv4 = req.body.ipv4;
        data.device = req.body.devices;
        Gateway.updateOne({_id: id}, data)
            .then(() => {
                return res.status(200).json({
                    message: "gateway updated successfully"
                });
            }).catch(err => {
            return res.status(500).json({
                message: "error in update gateway",
                error: err
            });
        });
    });
});

module.exports = router;
