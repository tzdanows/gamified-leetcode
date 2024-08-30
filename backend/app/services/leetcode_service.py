import requests
from flask import current_app

def check_problem_completion(leetname, problem_title):
    url = current_app.config['LEETCODE_API_URL'] + str(leetname) + '/acsubmission'
    response = requests.get(url)
    my_dict = response.json()
    
    for i in range(min(20, len(my_dict['submission']))):
        if my_dict['submission'][i]['title'] == problem_title:
            return True
    return False

# Add more LeetCode-related functions here as needed