import os
from io import BytesIO

from keras import models

from safetoswim.core import PhotoProcessor
from safetoswim.servers import flask_server


class TestPredict(object):
    def __init__(self):
        pass

    def test_predict_smoketest(self):
        file_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(file_dir, '..', 'servers', 'models', 'hab_MathBinaryClassifier.h5')
        print(f'Loading model from: {model_path}')
        model = models.load_model(model_path)
        img_file = os.path.join(file_dir, 'images', 'bloom.jpg')
        image = None
        with open(img_file, 'br') as f:
            image = f.read()
        photo_processor = PhotoProcessor(image)

        # preprocess the image and prepare it for classification
        rgb_data = photo_processor.prepare_rgb_data(img_size=(128, 128))
        preds = model.predict(rgb_data)
        assert model is not None
        assert preds[0][0] > 0.5

    def test_predict_flask(self):
        file_dir = os.path.dirname(os.path.abspath(__file__))

        img_file = os.path.join(file_dir, 'images', 'bloom.jpg')

        client = flask_server.application.test_client()
        client.testing = True
        data = None
        with open(img_file, 'br') as f:
            data = f.read()
        response = client.post ('/predict', content_type='multipart/form-data',
                                data=dict(image=(BytesIO(data), 'image.jpg')))
        assert response.status == '200 OK'


if __name__ == '__main__':
    tests = TestPredict()
    #tests.test_predict_smoketest()
    tests.test_predict_flask()