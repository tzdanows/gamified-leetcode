from flask import Blueprint, jsonify, current_app
from ..services.firebase_services import get_contests_info

contests_bp = Blueprint('contests', __name__)

@contests_bp.route('/contests', methods=['GET'])
def get_contests():
    contests = get_contests_info(current_app.db)
    return jsonify(contests)
