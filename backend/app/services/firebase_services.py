from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from google.cloud.firestore_v1 import ArrayUnion
from ..services.leetcode_service import check_problem_completion
import datetime

# access user account table in firestore
def get_user_accounts(db):
    users_ref = db.collection("user_accounts")
    docs = users_ref.stream()
    return [doc.to_dict() for doc in docs]

# access leaderboard table in firestore
# might need to change when it calls update_leaderboard_info, maybe based on clicks? instead of constantly
def get_leaderboard_info(db):
    update_leaderboard_info(db)
    leaderboard_ref = db.collection("leaderboard")
    docs = leaderboard_ref.stream()
    return [doc.to_dict() for doc in docs]

# access dailies table in firestore
def get_dailies_info(db):
    dailies_ref = db.collection("dailies")
    docs = dailies_ref.stream()
    return [doc.to_dict() for doc in docs]

def update_leaderboard_info(db):
    # format today's date to match date info in dailies table
    #todays_date = str(datetime.datetime.now())[:10]
    todays_date = '2024-09-03'
    
    # access today's problem
    problem = db.collection("dailies").where(filter=FieldFilter("date", "==", todays_date)).stream()
    for doc in problem:
      problem_info = doc.to_dict()
    points = problem_info['points']
    problem_title = problem_info['problem_name']
    awarded_users = problem_info['awarded']

    # iterate through each user 
    users = db.collection("user_accounts").stream()
    for doc in users:
        user_info = doc.to_dict()
        leetcode_name = user_info['leetcode_name']
        username = user_info['username']
        
        # if they completed the problem and have not been awarded yet, update their score
        if username not in awarded_users and check_problem_completion(leetcode_name, problem_title):
            user_ref = db.collection("leaderboard").document(username)
            user_ref.update({"score": firestore.Increment(points)})

            # update array of awarded users to avoid double counting points
            problem_ref = db.collection("dailies").document(todays_date)
            problem_ref.update({"awarded": firestore.ArrayUnion([username])})

            #insert logic for streaks
