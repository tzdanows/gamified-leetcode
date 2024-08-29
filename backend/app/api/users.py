# I think this might be unnecessary? and rather we might need an authentication service & api

from flask import Blueprint, jsonify, current_app
from ..services.firebase_services import get_user_accounts
from ..services.leetcode_service import check_problem_completion

users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['GET'])
def get_users():
    users = get_user_accounts(current_app.db)
    return jsonify(users)

@users_bp.route('/users/<string:leetname>/check/<string:problem_title>', methods=['GET'])
def check_user_problem(leetname, problem_title):
    completed = check_problem_completion(leetname, problem_title)
    return jsonify({'completed': completed})