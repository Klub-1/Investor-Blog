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

    def test_create_user_and_post(self):

        # ------- Create User Part -------
        random_user = randint(100000, 999999)
        new_user = {
            "username": f"test_user_{random_user}",
            "email": f"s{random_user}@student.dtu.dk",
            "password": "randomtestpassword"
        }

        # Test creating new user
        res = self.api_session.post(self.url + 'users/', json=new_user)
        self.assertEqual(res.status_code, 201)

        user_id = res.json()['id']

        # Test the new user exists
        res = self.api_session.get(self.url + f'users/{user_id}')
        self.assertEqual(res.status_code, 200)

        # ------- Create Blogpost Part -------

        new_post = {
            "title": "test title",
            "content": "test content",
            "tags": "testtag"
        }

        # Send request to create post
        request_url = self.url + f'users/{user_id}/blogposts/'
        res = self.api_session.post(request_url, json=new_post)

        print("-"*60)
        print("Creating with user id", user_id)
        print(res.json())
        print("-"*60)

        blogpost_id = res.json()['id']

        self.assertEqual(res.status_code, 201)

        # ------- Delete Blogpost Part -------

        request_url = self.url + \
            f'users/{user_id}/blogpost/{blogpost_id}/'

        res = self.api_session.delete(request_url)

        print("-"*60)
        print("delete post with id", blogpost_id)
        print(res.json())
        print("-"*60)

        status_message = res.json()['status']

        self.assertEqual(res.status_code, 200)
        self.assertEqual(status_message, "Blogpost deleted")

        # ------- Delete User Part -------
        # TODO: Implement delete user
        pass

    def tearDown(self):
        self.api_session.close()


if __name__ == '__main__':
    unittest.main()
