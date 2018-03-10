from keras.applications import ResNet50
from keras.preprocessing.image import img_to_array
from keras.applications import imagenet_utils
from keras import models
from PIL import Image
import numpy as np
import flask
import os, io

# initialize our Flask application and the Keras model
app = flask.Flask(__name__)
model = None
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
UPLOAD_FOLDER = 'images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def load_model():
    global model
    #model = ResNet50(weights="imagenet")
    model = models.load_model('D:\code\ML\SafeToSwim\models\hab_MathBinaryClassifier.h5')

def prepare_image(image, img_size):
    if image.mode != 'RGB':
        image = image.convert('RGB ')

    image = image.resize(img_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = imagenet_utils.preprocess_input(image)

    return image

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/predict", methods=['GET', 'POST'])
def predict():
    # initialize the data dictionary that will be returned from the
    # view
    data = {"success": False}

    # ensure an image was properly uploaded to our endpoint
    if flask.request.method == "POST":
        if flask.request.files.get("image"):
            # read the image in PIL format
            image = flask.request.files["image"].read()
            image = Image.open(io.BytesIO(image))

            # preprocess the image and prepare it for classification
            image = prepare_image(image, img_size=(128, 128))

            # classify the input image and then initialize the list
            # of predictions to return to the client
            preds = model.predict(image)
            #pred_class = model.p
            #results = imagenet_utils.decode_predictions(preds)
            if preds[0][0] >= 0.5:
                data["prediction"] = 'bloom'
            else:
                data["prediction"] = 'not-bloom'

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
            return flask.jsonify(data)
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
        ''' % "<br>".join(os.listdir(app.config['UPLOAD_FOLDER'],))


if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    load_model()
    app.run()
