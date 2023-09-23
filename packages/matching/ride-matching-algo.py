from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np

app = FastAPI()

# Load the drivers' data from the CSV file
travel_df = pd.read_csv('Travel.csv')

# Define the request data structure
class UserRequestBody(BaseModel):
    id: str
    balance: float
    reputation: float
    preferred_latitude: float
    preferred_longitude: float

# ... [Include the haversine_distance and find_best_match_for_user functions here] ...

# Endpoint to match a user with a driver
@app.post('/match_driver')
def match_driver(data: UserRequestBody):
    # Convert the request data to a pandas Series (to be compatible with our existing function)
    user_series = pd.Series(data.dict())
    
    # Use the matching function to get the matched driver's ID
    matched_driver_id = find_best_match_for_user(user_series, travel_df)
    
    # Return the matched driver's ID
    return {'matched_driver_id': matched_driver_id}
