from fastapi import FastAPI
import uvicorn
from sklearn.linear_model import LogisticRegression
from pydantic import BaseModel
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

app = FastAPI()

class request_body(BaseModel):
    engine_rpm : float
    lub_oil_pressure : float
    fuel_pressure : float
    coolant_pressure : float
    lub_oil_temp : float
    coolant_temp: float
    
df_engine = pd.read_csv('engine_data.csv')

#Logistic Regression

X = pd.DataFrame()

X['Engine rpm'] = df_engine["Engine rpm"]
X['Lub oil pressure'] = df_engine["Lub oil pressure"]
X['Fuel pressure'] = df_engine['Fuel pressure']
X['Coolant Pressure'] = df_engine['Coolant pressure']
X['Lub oil temp'] = df_engine['lub oil temp']
X['Coolant temp'] = df_engine['Coolant temp']

y = pd.DataFrame()
y['engine condition'] = df_engine['Engine Condition']



model = LogisticRegression(random_state=0)

model.fit(X, y)


# Creating an Endpoint to receive the data
# to make prediction on.
@app.post('/predict_engine')
def predict(data : request_body):
    # Making the data in a form suitable for prediction
    test_data = [[
            data.engine_rpm,
            data.lub_oil_pressure,
            data.fuel_pressure,
            data.coolant_pressure,
            data.lub_oil_temp,
            data.coolant_temp
    ]]
     
    # Predicting the Class
    class_idx = (model.predict(test_data))
    # Return the Result
    return { 'class' : float(class_idx[0])}