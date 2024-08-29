# for user challengges api

from flask import Blueprint

challenges_bp = Blueprint('challenges', __name__)

@challenges_bp.route('/challenges', methods=['GET'])
def get_challenges():
    return "Challenges endpoint"