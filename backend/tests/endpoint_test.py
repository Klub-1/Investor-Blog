"""Based of @baldm(Jonathan)
   on: https://github.com/baldm/TestLens/blob/main/tests/backend_test.py
"""

from random import randint
import unittest
import requests


class TestAPI(unittest.TestCase):

    def setUp(self):
        self.url = 'http://host.docker.internal:8000/'
        self.api_session = requests.Session()

    def test_create_user_and_delete(self):
        random_user = randint(100000, 999999)
        new_user = {
            "id": f"s{random_user}",
            "username": f"test_user_{random_user}",
            "email": f"s{random_user}@student.dtu.dk",
            "blogposts": []
        }

        # Test creating new user
        res = self.api_session.post(self.url + 'users/', json=new_user)
        self.assertEqual(res.status_code, 200)

        new_user_id = res.json()['id']

        # Test the new user exists
        res = self.api_session.get(self.url + f'users/{new_user_id}')
        self.assertEqual(res.status_code, 200)

    def test_create_blogpost(self):

        # Get a random user
        res = self.api_session.get(self.url + 'users/')
        user_id = res.json()[0]['id']

        new_post = {
            "title": "test title",
            "content": "test content",
            "likes": randint(1, 12),
            "dislikes": randint(0, 12)
        }

        # Send request to create post
        request_url = self.url + f'users/{user_id}/blogposts/'
        res = self.api_session.post(request_url, json=new_post)
        self.assertEqual(res.status_code, 200)

    def tearDown(self):
        self.api_session.close()


if __name__ == '__main__':
    unittest.main()
