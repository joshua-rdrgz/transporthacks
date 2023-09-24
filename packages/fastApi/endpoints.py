from fastapi import FastAPI
import uvicorn
from sklearn.linear_model import LogisticRegression
from pydantic import BaseModel
import pandas as pd
from sklearn.linear_model import LogisticRegression, LinearRegression

app = FastAPI()

########################################################################
# Health engine


class request_body_engine(BaseModel):
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


model_engine = LogisticRegression(random_state=0)

model_engine.fit(X, y)


# Creating an Endpoint to receive the data
# to make prediction on.
@app.post('/predict_engine')
def predict_engine(data : request_body_engine):
    # Making the data in a form suitable for prediction
    test_data_engine = [[
            data.engine_rpm,
            data.lub_oil_pressure,
            data.fuel_pressure,
            data.coolant_pressure,
            data.lub_oil_temp,
            data.coolant_temp
    ]]
     
    # Predicting the Class
    class_idx = (model_engine.predict(test_data_engine))
    # Return the Result
    return { 'class' : float(class_idx[0])}


##########################################################################
# Maintenance

from fastapi import FastAPI
import uvicorn
from sklearn.linear_model import LogisticRegression
from pydantic import BaseModel
import pandas as pd
from sklearn.neural_network import MLPRegressor



class request_body_maint(BaseModel):
    buying_price : int
    number_of_doors : int
    number_of_seats : int
    luggage_boot_size : int
    safety_rating : int
    popularity: int
    
df_maintenance = pd.read_csv('train.csv')

#Logistic Regression

X_maint = pd.DataFrame()

X_maint['buying_price'] = df_maintenance["buying_price"]
X_maint['number_of_doors'] = df_maintenance["number_of_doors"]
X_maint['number_of_seats'] = df_maintenance['number_of_seats']
X_maint['luggage_boot_size'] = df_maintenance['luggage_boot_size']
X_maint['safety_rating'] = df_maintenance['safety_rating']
X_maint['popularity'] = df_maintenance['popularity']

y_maint = pd.DataFrame()
y_maint['maintainence_cost'] = df_maintenance['maintainence_cost']



model_maint = MLPRegressor(random_state=0)

model_maint.fit(X_maint, y_maint)


# Creating an Endpoint to receive the data
# to make prediction on.
@app.post('/predict_maintenance')
def predict_maintenance(data : request_body_maint):
    # Making the data in a form suitable for prediction
    test_data_maint = [[
            data.buying_price,
            data.number_of_doors,
            data.number_of_seats,
            data.luggage_boot_size,
            data.safety_rating,
            data.popularity
    ]]
     
    # Predicting the Class
    class_idx_maint = model_maint.predict(test_data_maint)
     
    # Return the Result
    return { 'class' : abs(class_idx_maint[0])}



###################################################
#Matching 

## Load the drivers' data from the CSV file
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
