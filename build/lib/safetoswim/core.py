import numpy as np
import PIL
from keras.applications import ResNet50
import io
from keras.preprocessing.image import img_to_array
from keras.applications import imagenet_utils
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

class PhotoProcessor(object):
    def __init__(self, image):
        self._image = Image.open(io.BytesIO(image))
        self.exif = self.get_exif_data(self._image)

    def get_exif_data(self, image):
        """Returns a dictionary from the exif data of an PIL Image item. Also converts the GPS Tags"""
        exif_data = {}
        if image.__getattribute__('_getexif'):
            info = image._getexif()
            if info:
                for tag, value in info.items():
                    decoded = TAGS.get(tag, tag)
                    if decoded == "GPSInfo":
                        gps_data = {}
                        for t in value:
                            sub_decoded = GPSTAGS.get(t, t)
                            gps_data[sub_decoded] = value[t]

                        exif_data[decoded] = gps_data
                    else:
                        exif_data[decoded] = value
        return exif_data

    def prepare_rgb_data(self, img_size):
        rgb_data = None
        if self._image.mode != 'RGB':
            rgb_data = self._image.convert('RGB ')
        else:
            rgb_data = self._image

        rgb_data = rgb_data.resize(img_size)
        rgb_data = img_to_array(rgb_data)
        rgb_data = np.expand_dims(rgb_data, axis=0)
        rgb_data = imagenet_utils.preprocess_input(rgb_data)

        return rgb_data