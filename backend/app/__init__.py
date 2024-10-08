from flask import Flask
from flask_restful import Api
from firebase_admin import credentials, initialize_app, firestore
import os
# need this to connect to front-end
from flask_cors import CORS

def create_app(config_name):
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    app.config.from_object(f'config.{config_name.capitalize()}Config')
    
    # Initialize Firebase
    cred = credentials.Certificate(os.path.join(app.root_path, '..', 'database', 'serviceAccount.json'))
    firebase_app = initialize_app(cred)
    db = firestore.client(app=firebase_app)
    
    app.db = db
    
    api = Api(app)
    
    # Register blueprints
    from .api.auth import auth_bp
    from .api.users import users_bp
    from .api.leaderboard import leaderboard_bp
    from .api.dailies import dailies_bp
    from .api.contests import contests_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(leaderboard_bp)
    app.register_blueprint(dailies_bp)
    app.register_blueprint(contests_bp)
    
    return app