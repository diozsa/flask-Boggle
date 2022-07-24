from crypt import methods
from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, jsonify


app = Flask(__name__)
app.config['SECRET_KEY'] = "bogglekey"

boggle_game = Boggle()

@app.route('/')
def home_page():
    board = boggle_game.make_board()
    session["board"] = board
    score = session.get('score', 0)
    plays = session.get('plays', 0)
    return render_template('index.html', board=board, score=score, plays=plays)

@app.route('/check-word')
def check_word():
    """Check if word is in the dictionary list of words."""

    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})

