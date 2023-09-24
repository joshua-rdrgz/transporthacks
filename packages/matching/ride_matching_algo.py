from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import uvicorn

app = FastAPI()

# Load the drivers' data from the CSV file
travel_df = pd.read_csv('Travel.csv')
users_df = pd.read_csv('Users.csv')

# Define the request data structure
class UserRequestBody(BaseModel):
    startPlace_latitude: float
    startPlace_longitude: float
    endPlace_latitude: float
    endPlace_longitude: float

# ... [Include the haversine_distance and find_best_match_for_user functions here] ...
def find_best_match_for_user (user, df, users_df):
    X_match = pd.DataFrame()
    
    X_match['x_lat'] = df['startPlace.latitude']
    X_match['x_long'] = df['startPlace.longitude']
    X_match['y_lat'] = df['endPlace.latitude']
    X_match['y_long'] =  df['endPlace.longitude']
    
    y_balance = pd.DataFrame()
    y_balance['balance'] = df['priceBalance']
    
    model_balance = LinearRegression()
    model_balance.fit(X_match, y_balance)
    
    result_balance = model_balance.predict([user])
    result_balance_1 = (result_balance[0][0])
    result_balance_good = int(result_balance_1)
    
    users_df['balance'] = abs(users_df['balance'])
    
    for j in range(100):
        for i in range(1000):
            if users_df.iloc[i]['balance'] == result_balance_good+j:
                return users_df.iloc[i]['id']
    
    
     
# Endpoint to match a user with a driver
@app.post('/match_driver')
def match_driver(data: UserRequestBody):
    # Convert the request data to a pandas Series (to be compatible with our existing function)
    
    test_data_match = [
            data.startPlace_latitude,
            data.startPlace_longitude,
            data.endPlace_latitude,
            data.endPlace_longitude
    ]
    
    user_series = pd.Series(test_data_match) ############## Only not sure
    
    # Use the matching function to get the matched driver's ID
    matched_driver_id = find_best_match_for_user(user_series, travel_df, users_df)
    
    # Return the matched driver's ID
    return {'matched_driver_id': matched_driver_id}
