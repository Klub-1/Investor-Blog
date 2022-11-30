import requests
from random import randint

def populate_database(ip="http://localhost:8000/"):
    url = f'{ip}'

    users = [
        ("s194134", "Jonathan Zørn"),
        ("s205454", "Niklas Jessen Børner"),
        ("s205452", "Isak Risager"),
        ("s205424", "Louis Monty-Krohn"),
    ]

    post_descriptions = [
        ("Whats going on at Meta?", "What are they doing, why would someone spend billions on VR tech. I dont get it."),
        ("APPL Now bigger than Google, Meta and Amazon combined", "Thoughts?"),
        ("HOLD GME", "Monkeys strong together. Diamond hands."),
        ("Battery stocks, a scam?",
         "Hello Investorblog, 2 years ago i put my life savings into battery stocks. I have now lost 50% of all my money. Please advise?"),
    ]

    api_session = requests.Session()

    for user_id, name in users:
        new_user = {
            "id": user_id,
            "username": name,
            "email": f"{user_id}@student.dtu.dk",
            "blogposts": []
        }

        request_url = url + 'users/'
        res = api_session.post(request_url, json=new_user)

        if res.status_code != 200:
            print("Status code:", res.status_code)
            print("Error:\n", res.json(), "\n")
            print("With user:", new_user)
            raise ConnectionError

    for index, (title, description) in enumerate(post_descriptions):
        user_id = users[index][0]

        new_post = {
            "title": title,
            "content": description,
            "likes": randint(1, 12),
            "dislikes": randint(0, 12)
        }

        request_url = url + f'users/{user_id}/blogposts/'
        res = api_session.post(request_url, json=new_post)

        if res.status_code != 200:
            print("Status code:", res.status_code)
            print("Error:\n", res.json(), "\n")
            print("With post:", new_post)
            raise ConnectionError

if __name__ == "__main__":
    populate_database('http://localhost:8000')