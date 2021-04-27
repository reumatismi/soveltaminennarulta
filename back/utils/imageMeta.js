'use strict';
const {ExifImage} = require('exif');

const getCoordinates = (imgFile) => { // imgFile = full path to uploaded image
  return new Promise((resolve, reject) => {
    try {
      // TODO: Use node-exif to get longitude and latitude from imgFile
      new ExifImage({image: imgFile}, function(error, exifData) {
        if (error) {
          resolve([0,0]);
        } else {
          // console.log(exifData); // Do something with your data!
          const lon = gpsToDecimal(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef);
          const lat = gpsToDecimal(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef);
          resolve([lon, lat]);
        }
      });
      // coordinates below should be an array of GPS coordinates in decimal format: [longitude, latitude]
      // resolve(coordinates);
    } catch (error) {
      resolve([0,0]);
    }
  });
};

// convert GPS coordinates to decimal format
// for longitude, send exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef
// for latitude, send exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef
const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
  return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};
module.exports = {
  getCoordinates,
};