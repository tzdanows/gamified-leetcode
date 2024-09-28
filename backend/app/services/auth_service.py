from firebase_admin import auth
from flask import current_app

def create_user(email, password):
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        return user.uid
    except auth.EmailAlreadyExistsError:
        return None

def verify_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token['uid']
    except auth.InvalidIdTokenError:
        return None

def get_user(uid):
    try:
        user = auth.get_user(uid)
        return user
    except auth.UserNotFoundError:
        return None
