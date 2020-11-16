from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import ai


@api_view(["GET"])
def api_overview(request):
    api_urls = {
        "Solve for given state": "/solve/",
    }
    return Response(api_urls)


@api_view(["GET"])
def solve(request):
    board = request.headers.get("Squares", None)
    turn = request.headers.get("Turn", None)

    if board == None or turn == None:
        return Response({"No board/turn found"})

    board = eval(board.replace("null", "None"))
    if len(board) != 9:
        return Response({"Board size id not correct ie len(board)!=9"})

    winner, move = ai.get_move(board, turn)
    return Response({"move": move, "winner": winner})
