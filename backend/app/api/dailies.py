# we should expose objects pertaining to the problem of the day here
# this should display a new problem every day

from flask import Blueprint, jsonify, current_app
from ..services.firebase_services import get_dailies_info

dailies_bp = Blueprint('dailies', __name__)

@dailies_bp.route('/dailies', methods=['GET'])
def get_dailies():
    dailies = get_dailies_info(current_app.db)
    return jsonify(dailies)