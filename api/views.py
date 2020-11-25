from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import ai
<<<<<<< HEAD
import json
=======
>>>>>>> b51324d23c88b19456ce9346d168756cbd8ab8c5


@api_view(["GET"])
def api_overview(request):
    api_urls = {
        "Solve for given state": "/solve/",
    }
    return Response(api_urls)


@api_view(["POST"])
def solve(request):
    body_unicode = request.body.decode("utf-8")
    body_data = json.loads(body_unicode)
    # print(body_data)
    board = body_data.get("Squares", None)
    turn = body_data.get("Turn", None)

    if board == None or turn == None:
        return Response({"No board/turn found"})

    if len(board) != 9:
        return Response({"Board size id not correct ie len(board)!=9"})

    winner, move = ai.get_move(board, turn)
    return Response({"move": move, "winner": winner})
