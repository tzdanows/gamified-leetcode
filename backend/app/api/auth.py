from flask import Blueprint, request, jsonify
from ..services.auth_service import create_user, verify_token, get_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    uid = create_user(email, password)
    if uid:
        return jsonify({"message": "User created successfully", "uid": uid}), 201
    else:
        return jsonify({"error": "User already exists"}), 409

@auth_bp.route('/login', methods=['POST'])
def login():
    # Firebase Authentication handles login on the client-side
    # This endpoint is for verifying the token and returning user info
    id_token = request.json.get('idToken')
    if not id_token:
        return jsonify({"error": "ID token is required"}), 400
    
    uid = verify_token(id_token)
    if uid:
        user = get_user(uid)
        return jsonify({
            "uid": user.uid,
            "email": user.email,
            "displayName": user.display_name
        }), 200
    else:
        return jsonify({"error": "Invalid token"}), 401

# Logout is client-side by clearing the token