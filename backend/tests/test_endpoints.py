"""Based of @baldm(Jonathan)
   on: https://github.com/baldm/TestLens/blob/main/tests/backend_test.py
"""

from random import randint
import unittest
import requests


class TestAPI(unittest.TestCase):

    def setUp(self):
        self.url = 'https://investorblog.ml/api/'
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
        res = self.api_session.get(self.url + f'users/{user_id}/')
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
        blogpost_id = res.json()['id']

        self.assertEqual(res.status_code, 201)

        # ------- Delete Blogpost Part -------

        request_url = self.url + \
            f'users/{user_id}/blogpost/{blogpost_id}/'

        res = self.api_session.delete(request_url)
        status_message = res.json()['status']

        self.assertEqual(res.status_code, 200)
        self.assertEqual(status_message, "Blogpost deleted")

        # ------- Delete User Part -------

        request_url = self.url + \
            f'users/{user_id}/'

        res = self.api_session.delete(request_url)
        status_message = res.json()['status']

        self.assertEqual(res.status_code, 200)
        self.assertEqual(status_message, "User deleted")

        # -------- test register user --------
        request_url = self.url + \
            f'register/'

        random_user = randint(100000, 999999)
        new_user = {
            "username": f"test_user_{random_user}",
            "email": f"s{random_user}@student.dtu.dk",
            "password": "randomtestpassword"
        }
        res = self.api_session.post(request_url, json=new_user)
        self.assertEqual(res.status_code, 200)

        # -------- test login user --------
        request_url = self.url + \
            f'login/'

        new_user = {
            "email": f"s{random_user}@student.dtu.dk",
            "password": "randomtestpassword"
        }
        res = self.api_session.post(request_url, json=new_user)
        self.assertEqual(res.status_code, 200)

        # -------- gets token --------
        token = res.json()

        # -------- test userexists --------
        request_url = self.url + \
            f'checkifuserexists?email=s{random_user}@student.dtu.dk'
        res = self.api_session.get(request_url)
        self.assertEqual(res.status_code, 200)
        # -------- test userexists --------
        request_url = self.url + \
            f'checkifuserexists?email=dennebrugerskalikkeoprettes'
        res = self.api_session.get(request_url)
        self.assertEqual(res.status_code, 409)

        # -------- test get user --------
        request_url = self.url + \
            f'user?token={token}'
        res = self.api_session.get(request_url)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()['user']['email'],
                         f's{random_user}@student.dtu.dk')
        self.assertEqual(res.json()['user']
                         ['username'], f'test_user_{random_user}')

    def tearDown(self):
        self.api_session.close()


if __name__ == '__main__':
    unittest.main()
