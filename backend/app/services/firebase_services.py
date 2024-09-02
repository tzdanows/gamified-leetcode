from firebase_admin import firestore

# access user account table in firestore
def get_user_accounts(db):
    users_ref = db.collection("user_accounts")
    docs = users_ref.stream()
    return [doc.to_dict() for doc in docs]

# access leaderboard table in firestore
def get_leaderboard(db):
    users_ref = db.collection("leaderboard")
    docs = users_ref.stream()
    return [doc.to_dict() for doc in docs]
