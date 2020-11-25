import math


lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


def _is_end(board):
    # checks if game has been ended
    for line in lines:
        a, b, c = line
        if board[a] and board[a] == board[b] == board[c]:
            return board[a]

    return None


def mn(board, turn, maximizing, alpha=-math.inf, beta=math.inf):
    winner = _is_end(board)

    if winner != None:
        return (10, None) if winner == maximizing else (-10, None)

    if all(board):
        # if game is a tie
        return (0, None)

    mx = -math.inf if turn == maximizing else math.inf
    move = None

    for i in range(9):
        if board[i] != None:
            continue

        board[i] = turn
        score, _ = mn(
            board=board,
            turn="O" if turn == "X" else "X",
            maximizing=maximizing,
            alpha=alpha,
            beta=beta,
        )
        board[i] = None

        if turn == maximizing:
            if score > mx:
                mx = score
                move = i

            if mx >= beta:
                return mx, move

            if mx > alpha:
                alpha = mx

        else:
            if score < mx:
                mx = score
                move = i

            if mx <= alpha:
                return mx, move

            if mx < beta:
                beta = mx

    return mx, move


def get_move(board, turn):
    _, move = mn(board, turn, turn)
    if move:
        board[move] = turn
    return _is_end(board) or ("Tie" if all(board) else None), move


if __name__ == "__main__":
    board = ["O", None, None, None, None, None, None, None, None]
    for i in range(3):
        print([board[i * 3 + k] for k in range(3)])

    turn = "X"
    ans = mn(board, turn, turn)

    print(ans)