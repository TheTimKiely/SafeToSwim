import argparse

import numpy as np

from rembrandtml.configuration import DataConfig, ModelConfig, ContextConfig, VisualizationConfig
from rembrandtml.factories import ContextFactory
from rembrandtml.visualization import Visualizer
from rembrandtml.models import ModelType
from sklearn.metrics import roc_curve, auc


def main(args=None):
    print('you are running safetoswim')
    # 1. Define the datasource.
    # dataset = 'iris'
    # data_file = os.path.abspath(os.path.abspath(os.path.join(os.getcwd(), '..', '..', 'data', 'gapminder', 'gm_2008_region.csv')))
    # data_config = DataConfig('pandas', dataset, data_file)
    data_config = DataConfig('sklearn', 'iris')

    # 2. Define the models.
    model_configs = []
    model_configs.append(ModelConfig('Sklearn LogReg', 'sklearn', ModelType.LOGISTIC_REGRESSION))
    model_configs.append(ModelConfig('Sklearn SVC', 'sklearn', ModelType.SVC))

    # 3. Create the Context.
    context_config = ContextConfig(model_configs, data_config)
    context_config.visualization_config = VisualizationConfig((8, 8), 'ggplot')
    context = ContextFactory.create(context_config)

    # 4. Prepare the data.
    # Use only two features for plotting
    # features = ('sepal length (cm)', 'sepal width (cm)')
    features = ('petal length (cm)', 'petal width (cm)')

    '''
    plt.imshow(train_set_x_orig[index])

    ### START CODE HERE ### (≈ 2 lines of code)
    train_set_x_flatten = train_set_x_orig.reshape(train_set_x_orig.shape[0], -1).T
    test_set_x_flatten = test_set_x_orig.reshape(test_set_x_orig.shape[0], -1).T

    train_set_x = train_set_x_flatten / 255.
    test_set_x = test_set_x_flatten / 255.
    '''

    # override data management to turn multiclassification problem into binary classification
    from sklearn import datasets
    iris = datasets.load_iris()
    X = iris["data"][:, 3:]  # petal width
    y = (iris["target"] == 2).astype(np.int)
    context.data_container.X = X
    context.data_container.y = y
    context.data_container.split()
    # context.prepare_data(features=features)

    # 5. Train the model.
    context.train()

    # 6 Evaluate the model.
    scores = context.evaluate()
    print('Scores:')
    for name, score in scores.items():
        print(f'\n\tScore[{name}] - {score}')

    # 7. Make predictions.
    predictions = context.predict(context.data_container.X_test)
    for name, prediction in predictions.items():
        # df = pd.DataFrame({'Prediction': [[max(i) for i in predictions.values]], 'Predictions': [predictions.values], 'Labels:': [context.data_container.y_test]})
        results = zip(context.data_container.y_test, prediction.values)
        for result in results:
            print(f'Label: {result[0]} Prediction: {result[1]}')

    # Plot outputs
    if plot:
        vis = Visualizer(context.config.visualization_config)
        # The ROC curve is for 1 class only, so we'll plot each class separately
        for name, prediction in predictions.items():
            fpr, tpr, th = roc_curve(context.data_container.y_test, prediction.values)
            roc_auc = auc(fpr, tpr)
            vis.plot_roc_curve(fpr, tpr, roc_auc, label=name)
        vis.show()


if __name__ == '__main__':
    args = ('p', 'true')
    main(args)