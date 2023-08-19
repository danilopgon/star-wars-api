from flask import jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, verify_jwt_in_request
from tools import bcrypt


from jwt.exceptions import ExpiredSignatureError

from models import User
from tools import db


def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    find_user = User.query.filter_by(username=username).first()

    if not find_user:
        return jsonify({"message": "User not found"}), 404
   
  
    if not bcrypt.check_password_hash(find_user.password, password):
        return jsonify({"message": "Invalid password"}), 400
        
    user_data = find_user.serialize_with_favorites()
    access_token = create_access_token(identity=user_data)
    return jsonify({"message": "Login successful", "token": access_token}), 200
        

def signup():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = False

  
    if not username or not email or not password:
        return jsonify({"msg": "Missing required fields"}), 400


    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"msg": "Username already exists"}), 409

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({"msg": "Email already exists"}), 409


    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')


    new_user = User(username=username, email=email, password=hashed_password, is_active=is_active)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"msg": "Failed to register user", "error": str(e)}), 500

    return jsonify({"msg": "User registered successfully"}), 201

def validate_token():
    try:
        response = verify_jwt_in_request()
        current_user = get_jwt_identity()
        
        if (not response):
            return {"message": "Invalid token"}, 401 
            
            
        return {"message": "Token is valid", "user": current_user}, 200
        
  
    except Exception as e:
        return {"message": "An error occurred while validating the token"}, 500