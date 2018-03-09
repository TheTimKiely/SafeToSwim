import os, requests


def submit_request(url, payload):
    # submit the request
    r = requests.post(url, files=payload).json()

    # ensure the request was successful
    if r["success"]:
        # loop over the predictions and display them
        for (i, result) in enumerate(r["predictions"]):
            print("{}. {}: {:.4f}".format(i + 1, result["label"],
                result["probability"]))

    # otherwise, the request failed
    else:
        print("Request failed")

if __name__ == '__main__':
    url = "http://localhost:5000/predict"
    img_path = os.path.join('images', 'dog.jpg')

    # load the input image and construct the payload for the request
    image = open(img_path, "rb").read()
    payload = {"image": image}
    submit_request(url, payload)
