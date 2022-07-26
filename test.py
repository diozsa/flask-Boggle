from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
client = app.test_client()

class FlaskTests(TestCase):

    def test_homepage(self):
        """
        Test for homepage html and session
        - as I didn't test it enough while writing the code
        """

        with client:
            response = client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('topscore'))
            self.assertIsNone(session.get('plays'))
            self.assertIn(b'<p>Top Score:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Seconds Left:', response.data)

    def test_not_on_board(self):
        """Test if word is in the dictionary but not on board"""

        client.get('/')
        response = client.get('/check-word?word=encyclopedia')
        self.assertEqual(response.json['result'], 'not-on-board')


    def test_invalid_word(self):
        """Test if word is not existing"""

        client.get('/')
        response = client.get('/check-word?word=testing_es_una_stupida_proposition_when_i_can_clearly_test_the_whole_thing_manualy_without_all_this_extra_time_for_extra_crap')
        self.assertEqual(response.json['result'], 'not-word')

    def test_descartes(self):
        """self fufilling prophecy"""
        print("I am thinking, therefore I exist...DUHHH")

