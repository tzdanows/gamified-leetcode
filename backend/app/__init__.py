from flask import Flask
from flask_restful import Api
from firebase_admin import credentials, initialize_app, firestore
import os

def create_app(config_name):
    app = Flask(__name__)
    
    app.config.from_object(f'config.{config_name.capitalize()}Config')
    
    # Initialize Firebase
    cred = credentials.Certificate(os.path.join(app.root_path, '..', 'database', 'serviceAccount.json'))
    firebase_app = initialize_app(cred)
    db = firestore.client(app=firebase_app)
    
    app.db = db
    
    api = Api(app)
    
    # blueprints/resources here
    from .api.users import users_bp
    from .api.leaderboard import leaderboard_bp
    from .api.dailies import dailies_bp
    
    app.register_blueprint(users_bp)
    app.register_blueprint(leaderboard_bp)
    app.register_blueprint(dailies_bp)
    
    return app