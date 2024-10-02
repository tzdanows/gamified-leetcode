from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from google.cloud.firestore_v1 import ArrayUnion
from ..services.leetcode_service import check_problem_completion
from datetime import datetime, timedelta

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
    query = leaderboard_ref.order_by("score", direction=firestore.Query.DESCENDING)
    docs = query.stream()
    return [doc.to_dict() for doc in docs]

# access dailies table in firestore
def get_dailies_info(db):
    dailies_ref = db.collection("dailies")
    docs = dailies_ref.stream()
    return [
        {
            "date": doc.to_dict().get("date"),
            "difficulty": doc.to_dict().get("difficulty"),
            "link": doc.to_dict().get("link"),
            "problem_name": doc.to_dict().get("problem_name"),
            "awarded": doc.to_dict().get("awarded"),
        }
        for doc in docs
    ]

# currently not used
def update_leaderboard_info(db):
    # format today's date to match date info in dailies table
    #todays_date = str(datetime.datetime.now())[:10]
    todays_date = '2024-09-03'
    #yesterdays_date = str(datetime.datetime.now() - timedelta(days=1))[:10]
    yesterdays_date = '2024-09-02'
    
    # access today's problem
    problem = db.collection("dailies").where(filter=FieldFilter("date", "==", todays_date)).stream()
    for doc in problem:
      problem_info = doc.to_dict()
    points = problem_info['points']
    problem_title = problem_info['problem_name']
    awarded_users = problem_info['awarded']

    # access yesterday's problem
    yesterdays_problem = db.collection("dailies").where(filter=FieldFilter("date", "==", yesterdays_date)).stream()
    for doc in yesterdays_problem:
        yesterdays_problem_info = doc.to_dict()
    yesterdays_awarded_users = yesterdays_problem_info['awarded']

    # iterate through each user 
    users = db.collection("user_accounts").stream()
    for doc in users:
        user_info = doc.to_dict()
        leetcode_name = user_info['leetcode_name']
        username = user_info['username']

        user_ref = db.collection("leaderboard").document(username)

        if username not in yesterdays_awarded_users:
            user_ref.update({"current_streak": 0})

        # if they completed the problem and have not been awarded yet, update their score
        if username not in awarded_users and check_problem_completion(leetcode_name, problem_title):
            user_ref.update({"score": firestore.Increment(points)})
            user_ref.update({"problems_solved": firestore.Increment(1)})

            # update array of awarded users to avoid double counting points
            problem_ref = db.collection("dailies").document(todays_date)
            problem_ref.update({"awarded": firestore.ArrayUnion([username])})

            # insert logic for streaks
            if username in yesterdays_awarded_users:
                user_ref.update({"current_streak": firestore.Increment(1)})
            else:
                user_ref.update({"current_streak": 1})

# currently not used, implementation for contests collection usage, frontend needs updates if used
def get_contests_info(db):
    contests_ref = db.collection("contests")
    contests = []
    for contest_doc in contests_ref.stream():
        contest_data = contest_doc.to_dict()
        contest = {
            "id": contest_doc.id,
            "name": contest_data.get("name"),
            "startDate": contest_data.get("startDate"),
            "endDate": contest_data.get("endDate"),
            "problems": []
        }
        
        problems_ref = contest_doc.reference.collection("problems")
        for problem_doc in problems_ref.stream():
            problem_data = problem_doc.to_dict()
            contest["problems"].append({
                "title": problem_data.get("title"),
                "difficulty": problem_data.get("difficulty"),
                "link": problem_data.get("link"),
                "points": problem_data.get("points")
            })
        
        contests.append(contest)
    
    return contests




