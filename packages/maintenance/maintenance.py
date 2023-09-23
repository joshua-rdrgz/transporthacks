from fastapi import FastAPI
import uvicorn
from sklearn.linear_model import LogisticRegression
from pydantic import BaseModel
import pandas as pd
from sklearn.neural_network import MLPRegressor
from sklearn.model_selection import train_test_split

app = FastAPI()

class request_body(BaseModel):
    buying_price : int
    number_of_doors : int
    number_of_seats : int
    luggage_boot_size : int
    safety_rating : int
    popularity: int
    
df_maintenance = pd.read_csv('train.csv')

#Logistic Regression

X = pd.DataFrame()

X['buying_price'] = df_maintenance["buying_price"]
X['number_of_doors'] = df_maintenance["number_of_doors"]
X['number_of_seats'] = df_maintenance['number_of_seats']
X['luggage_boot_size'] = df_maintenance['luggage_boot_size']
X['safety_rating'] = df_maintenance['safety_rating']
X['popularity'] = df_maintenance['popularity']

y = pd.DataFrame()
y['maintainence_cost'] = df_maintenance['maintainence_cost']



model = MLPRegressor(random_state=0)

model.fit(X, y)


# Creating an Endpoint to receive the data
# to make prediction on.
@app.post('/predict_maintenance')
def predict(data : request_body):
    # Making the data in a form suitable for prediction
    test_data = [[
            data.buying_price,
            data.number_of_doors,
            data.number_of_seats,
            data.luggage_boot_size,
            data.safety_rating,
            data.popularity
    ]]
     
    # Predicting the Class
    class_idx = model.predict(test_data)
     
    # Return the Result
    return { 'class' : abs(class_idx[0])}