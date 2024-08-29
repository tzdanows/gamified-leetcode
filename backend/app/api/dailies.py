# we should expose objects pertaining to the problem of the day here

from flask import Blueprint

dailies_bp = Blueprint('dailies', __name__)

@dailies_bp.route('/dailies', methods=['GET'])
def get_dailies():
    return "Dailies endpoint"