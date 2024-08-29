# we should expose objects pertaining to the leaderboard here
# we also need a service to handle the calculations

from flask import Blueprint

challenges_bp = Blueprint('leaderboard', __name__)

@challenges_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return "Leaderboard endpoint"