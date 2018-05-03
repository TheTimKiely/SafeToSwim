import os
#import theano
#os.environ["KERAS_BACKEND"] = "theano"
import flask
from keras import models
import tensorflow as tf

# initialize our Flask application and the Keras model
from safetoswim.core import PhotoProcessor

application = flask.Flask(__name__)
model = None
graph = tf.get_default_graph()
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
UPLOAD_FOLDER = 'images'
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def load_model():
    global model
    global graph
    file_dir = os.path.abspath(os.path.dirname(__file__))
    #model = ResNet50(weights="imagenet")
    model_path = os.path.join(file_dir, 'models', 'hab_MathBinaryClassifier.h5')
    print(f'Loading model from: {model_path}')
    model = models.load_model(model_path)
    if model is None:
        raise TypeError(f'Failed to load model from file {model_path}')


def get_model():
    global model
    if model is None:
        load_model()
    return model

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@application.route("/", methods=['GET'])
def index():
    return '''<!doctype html>
        <title>Safe To Swim</title>
        <h1>Welcome to SafeToSwim!</h1>'''

@application.route("/predict", methods=['GET', 'POST'])
def predict():
    # initialize the data dictionary that will be returned from the
    # view
    data = {"success": False}

    # ensure an image was properly uploaded to our endpoint
    if flask.request.method == "POST":
        if flask.request.files.get("image"):
            try:
                # read the image in PIL format
                image = flask.request.files["image"].read()
                photo_processor = PhotoProcessor(image)

                # preprocess the image and prepare it for classification
                rgb_data = photo_processor.prepare_rgb_data(img_size=(128, 128))

                # classify the input image and then initialize the list
                # of predictions to return to the client
                preds = None
                model = get_model()
                with graph.as_default():
                    preds = model.predict(rgb_data)
                #results = imagenet_utils.decode_predictions(preds)
                if preds[0][0] >= 0.5:
                    data["prediction"] = 'bloom'
                else:
                    data["prediction"] = 'not-bloom'

                data['exif'] = photo_processor.exif

                # loop over the results and add them to the list of
                # returned predictions
                '''
                for (imagenetID, label, prob) in results[0]:
                    r = {"label": label, "probability": float(prob)}
                    data["predictions"].append(r)
                '''

                # indicate that the request was a success
                data["success"] = True

                # return the data dictionary as a JSON response
                response = flask.jsonify(str(data))
            except Exception as ex:
                response = flask.jsonify('SafeToSwim encountered an unexpected error: {}'.format(ex))
            return response
        else:
            pass
    else:
        return '''
        <!doctype html>
        <title>Upload new File</title>
        <h1>Upload new File</h1>
        <form action="" method=post enctype=multipart/form-data>
          <p><input type=file capture=camera accept=image/* name=image>
             <input type=submit value=Upload>
        </form>
        <p>%s</p>
        ''' % "<br>".join(os.listdir(application.config['UPLOAD_FOLDER'], ))


if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    load_model()
    application.run()#`host="0.0.0.0", debug=True)

