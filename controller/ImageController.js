var mongoose = require('mongoose');
var formidable = require('formidable');
var Image = mongoose.model('Image');
var Thumbnail = mongoose.model('Thumbnail');
var ImageRepository = require('../repository/ImageRepository.js');

/**
 * POST - UPLOAD
 *
 * Upload an image in the database and return the image ID
 *
 * @param req   The Request
 * @param res   The Response
 */
exports.uploadImage = function (req, res) {

        new formidable.IncomingForm().parse(req)
            .on('file', function (name, file) {
                ImageRepository.saveImage(name, file, function (err,data) {
                    if (err){
                        res.status(415).json({error: err});
                    }else{
                        res.status(200).json({id: data});
                    }
                });
            }).on('error', function (err) {
            console.log('*** ERROR SUBIENDO EL ARCHIVO');
            res.status(415).json({error: "Incorrect Image"});
        });
};

/**
 * GET - DOWNLOAD
 *
 * Searchs an image with an ID on the mongoDB database and return it
 *
 * @param req   The Request
 * @param res   The Response
 */
exports.getImage = function (req, res) {
    console.log('Entrando en /download con id ', req.param('id'));

    Image.findOne({_id: req.param('id')}, function (err, image) {
        if (err || !image) {
            console.log('ERROR: imagen no encontrada :');
            res.status(404).json({error: "Not Found"});
        } else {
            console.log('*** Recuperada imagen del tipo :', image.contentType);
            res.set("Content-Type", image.contentType);
            res.send(image.data);
        }
    });
};

/**
 * GET - THUMBNAIL
 *
 * Searchs an image thumbnail with an ID on the mongoDB database and return it
 *
 * @param req   The Request
 * @param res   The Response
 */
exports.getThumbnail = function (req, res) {
    console.log('Entrando en /thumbnail con id ', req.param('id'));

    Thumbnail.findOne({_id: req.param('id')}, function (err, image) {
        if (err || !image) {
            console.log('ERROR: imagen no encontrada :');
            res.status(404).json({
                error: "Not Found"
            });
        } else {
            console.log('*** Recuperada imagen del tipo :', image.contentType);
            res.set("Content-Type", image.contentType);
            res.send(image.data);
        }
    });
};
