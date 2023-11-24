import pickle
import sys

with open('RandomForest.pkl', 'rb') as model_file:
    model = pickle.load(model_file)


def predict(input_data):
    prediction = model.predict([input_data])
    return prediction.tolist()


# input_data = sys.stdin.read()
temperature = float(sys.argv[1])
humidity = float(sys.argv[2])
ph = float(sys.argv[3])
water = float(sys.argv[4])
crop = float(sys.argv[5])

result = predict([temperature, humidity, ph, water, crop])
print(result[0])