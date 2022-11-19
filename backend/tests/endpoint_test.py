"""Based of @baldm(Jonathan)
   on: https://github.com/baldm/TestLens/blob/main/tests/backend_test.py
"""

import unittest
import requests


class TestAPI(unittest.TestCase):

    def setUp(self):
        self.url = 'http://localhost:8000/'
        self.api_session = requests.Session()

    def test_create_user_and_delete(self):

        new_user = {
            "id": "s123456",
            "username": "test_user",
            "email": "s123456@student.dtu.dk",
            "blogposts": []
        }

        # Test creating new user
        res = self.api_session.post(self.url + 'users/', data=new_user)
        self.assertEqual(res.status_code, 201)

        new_user_url = res.json()['url']

        # Test the new user exists
        res = self.api_session.get(new_user_url)
        self.assertEqual(res.status_code, 200)

        # Remove the user again
        res = self.api_session.delete(new_user_url)
        self.assertEqual(res.status_code, 204)

    def tearDown(self):
        self.api_session.close()


if __name__ == '__main__':
    unittest.main()
