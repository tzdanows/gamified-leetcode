# we should expose objects pertaining to the leaderboard here
# we also need a service to handle the calculations

from flask import Blueprint, jsonify, current_app
from ..services.firebase_services import get_leaderboard

leaderboard_bp = Blueprint('leaderboard', __name__)

@leaderboard_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard = get_leaderboard(current_app.db)
    return jsonify(leaderboard)