var express = require('express');
var router = express.Router();
var Version = require('../models/version');

/* Create a version for this ecosystem */
router.post('/', function (req, res, next) {
    var version = new Version();
    version.env = req.body.env;
    version.ver = req.body.ver;
    version.build = req.body.build;

    version.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Version created!'})
    });
});

/* Get all versions for this ecosystem */
router.get('/', function (req, res, next) {
    Version.find(function (err, versions) {
        if (err) {
            res.send(err);
        }
        res.json(versions);
    });
});

/* Set the version for a given environment */
router.put('/:env', function (req, res, next) {
    Version.findOne({env: req.params.env}, function (err, version) {
        if (err) {
            res.send(err);
        }
        version.ver = req.body.ver;
        version.build = req.body.build;

        version.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Version updated!'});
        });
    });
});

/* Get the version for a given environment */
router.get('/:env', function (req, res, next) {
    Version.findOne({env: req.params.env}, function (err, version) {
        if (err) {
            res.send(err);
        }
        res.json(version);
    });
});

/* Delete the version for a given environment */
router.delete('/:env', function (req, res, next) {
    Version.remove({env: req.params.env}, function (err, version) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Version successfully deleted'});
    });
});

module.exports = router;
