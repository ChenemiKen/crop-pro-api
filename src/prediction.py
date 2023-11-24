import pickle
import sys

with open('RandomForest.pkl', 'rb') as model_file:
    model = pickle.load(model_file)


def predict(input_data):
    prediction = model.predict([input_data])
    return prediction.tolist()


input_data = sys.stdin.read()

data = input_data.split(",")
fixtures = [float(x) for x in data]

result = predict(fixtures)
print(result)