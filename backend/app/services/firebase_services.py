from firebase_admin import firestore

def get_user_accounts(db):
    users_ref = db.collection("user_accounts")
    docs = users_ref.stream()
    return [doc.to_dict() for doc in docs]

# Add more Firebase-related functions here as needed