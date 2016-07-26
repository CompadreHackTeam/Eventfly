/**
 * IMAGE MANAGER
 */
var mongoose = require('mongoose');
var Image = mongoose.model('Image');
var Thumbnail = mongoose.model('Thumbnail');
var config = require('../server.properties');
var fs = require('fs');
var lwip = require('lwip');
var formats = ["png", "gif", "jpg", "jpeg"];

module.exports = {

    /**
     * This function save a image and thumbnail in the mongoDB database and return the unique ID
     * @param name      The image name
     * @param file      The image file
     * @param callback  The callback
     */
    saveImage: function (name, file, callback) {

        // to lower case for security
        file.name = file.name.toLowerCase();

        console.log('*** Recibido fichero :', file.name);
        console.log('*** Tamaño del fichero :', file.size, 'bytes');
        console.log('*** Tipo de fichero :', file.type);

        // create a new image
        var image = new Image({
            data: fs.readFileSync(file.path),
            contentType: file.type
        });

        // save the image
        image.save(function (err, image) {
            if (err) throw err;
            // This only be executed if is an image (jpg,png,gif)
            if (formats.indexOf(file.name.split('.').pop()) > -1) {
                // read the uploaded image to resize it
                fs.readFile(file.path, function (err, buffer) {
                    lwip.open(buffer, file.name.split('.').pop(), function (err, thumb) {

                        // this do the trick to resize the image, thumbnail_height is in the properties file
                        var ratio = config.thumbnail_height / thumb.height();

                        thumb.scale(ratio, function (err, thumb) {
                            thumb.toBuffer(file.name.split('.').pop(), function (err, buffer) {
                                // create a new thumbnail
                                var thumbnail = new Thumbnail({
                                    data: buffer,
                                    contentType: file.type,
                                    _id: image._id
                                });
                                // we save the thumbnail
                                thumbnail.save(function (err, thumbnail) {
                                    if (err) throw err;
                                    console.log('*** Imagen guardada, devolviendo ID :' + image._id);
                                    callback(null,image._id);
                                });
                            });
                        });
                    });
                });
            } else {
                callback("Incorrect Image");
            }
            // This method erase the file from the TMP dir
            fs.unlink(file.path, function (err) {
                if (err) {
                    console.log(err);
                    callback(err,null)
                }
                //console.log('*** Fichero borrado de la carpeta temporal /tmp :', file.name);
            });
        });
    }
};
