from keras.applications import ResNet50
from keras.preprocessing.image import img_to_array
from keras.applications import imagenet_utils
from keras import models
from PIL import Image

class PhotoProcessor(object):
    def __init__(self, image):
        self._image = image

    def prepare_rgb_datas(self, img_size):
        rgb_data = None
        if self._image.mode != 'RGB':
            rgb_data = self._image.convert('RGB ')

        rgb_data = rgb_data.resize(img_size)
        rgb_data = img_to_array(rgb_data)
        rgb_data = np.expand_dims(rgb_data, axis=0)
        rgb_data = imagenet_utils.preprocess_input(rgb_data)

        return rgb_data