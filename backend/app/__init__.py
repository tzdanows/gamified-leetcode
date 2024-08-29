from flask import Flask
from flask_restful import Api
from firebase_admin import credentials, initialize_app, firestore
import os

def create_app(config_name):
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(f'config.{config_name.capitalize()}Config')
    
    # Initialize Firebase
    cred = credentials.Certificate(os.path.join(app.root_path, '..', 'database', 'serviceAccount.json'))
    firebase_app = initialize_app(cred)
    db = firestore.client(app=firebase_app)
    
    # Attach db to app
    app.db = db
    
    # Initialize API
    api = Api(app)
    
    # Import and register blueprints/resources here
    from .api.users import users_bp
    from .api.challenges import challenges_bp
    
    app.register_blueprint(users_bp)
    app.register_blueprint(challenges_bp)
    
    return app