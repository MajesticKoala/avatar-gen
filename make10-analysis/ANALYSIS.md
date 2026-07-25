# The Four-Digit "Make 10" Puzzle — Analysis

**Game.** You're given four digits, each `0`–`9`. Combine them with `+ − × ÷`
to reach exactly **10**.

**Rules used for this analysis** (confirmed with the player):

- You may **reorder** the four digits freely.
- **Parentheses** (any grouping) are allowed.
- Every digit is used **exactly once** — no more, no less.
- No digit-gluing: a `1` and a `0` cannot be concatenated into `"10"`.
- Real division is allowed, so fractions may appear in intermediate steps
  (e.g. `2 ÷ 3 × (7 + 8) = 10`).
- No unary minus (you can't negate a lone digit; subtraction between terms
  is of course fine).

The counts below come from an **exhaustive** search over every permutation
of the digits, all 5 ways to parenthesize four operands, and all `4³` operator
choices, using exact rational arithmetic (`fractions.Fraction`) — so there is
no rounding error and no "close enough to 10." See [`make10.py`](./make10.py).

---

## Results

### Counting all 10,000 four-digit strings (`0000`–`9999`)

Each position is an independent digit `0`–`9`, so there are `10⁴ = 10,000`
strings. Treating the string as the "hand" you're dealt:

| | Count | Share |
|---|---:|---:|
| Total strings | **10,000** | 100% |
| Can make 10 | 8,147 | 81.47% |
| **Impossible** | **1,853** | 18.53% |

### Counting the 715 distinct digit-sets (order ignored)

Because reordering is allowed, whether a hand is solvable depends only on the
*multiset* of digits, not their order. The number of distinct multisets of
size 4 from 10 symbols is `C(10+4−1, 4) = C(13, 4) = 715`.

| | Count | Share |
|---|---:|---:|
| Total digit-sets | **715** | 100% |
| Can make 10 | 552 | 77.2% |
| **Impossible** | **163** | 22.8% |

> The two tables describe the same puzzle at different granularities. The
> 1,853 impossible **strings** are exactly the orderings of the 163
> impossible **digit-sets**.

---

## For reference: how other rule choices compare

If you *didn't* allow reordering and/or parentheses, the impossible count
(out of 10,000 strings) would be higher:

| Rules | Can make 10 | Impossible |
|---|---:|---:|
| Fixed order, **no** parentheses (standard precedence) | 4,349 | 5,651 |
| Fixed order, parentheses allowed | 5,878 | 4,122 |
| **Reorder + parentheses (this game)** | **8,147** | **1,853** |

---

## The 163 impossible digit-sets

No arrangement of these four digits can reach 10 (digits shown in sorted
order; e.g. `2257` means the multiset {2, 2, 5, 7}):

```
0000 0001 0002 0003 0004 0005 0006 0007 0008 0009
0011 0012 0013 0014 0015 0016 0017 0018 0022 0023
0024 0026 0027 0029 0033 0034 0035 0036 0038 0039
0044 0045 0047 0048 0049 0056 0057 0058 0059 0066
0067 0068 0069 0077 0078 0079 0088 0089 0099 0111
0112 0113 0114 0116 0117 0122 0123 0134 0144 0148
0157 0158 0166 0167 0168 0177 0178 0188 0222 0233
0236 0269 0277 0279 0299 0333 0335 0336 0338 0344
0345 0348 0359 0366 0369 0388 0389 0399 0444 0445
0447 0448 0457 0478 0479 0489 0499 0566 0567 0577
0588 0589 0599 0666 0667 0668 0677 0678 0689 0699
0777 0778 0788 0799 0888 1111 1112 1113 1122 1159
1169 1177 1178 1179 1188 1399 1444 1499 1666 1667
1677 1699 1777 2257 3444 3669 3779 3999 4444 4459
4477 4558 4899 4999 5668 5788 5799 5899 6666 6667
6677 6777 6778 6888 6899 6999 7777 7788 7789 7799
7888 7999 8899
```

### Patterns worth noticing

- **A zero is a big handicap.** 115 of the 163 impossible sets contain at
  least one `0`. A `0` can only add nothing, subtract nothing, multiply the
  whole thing to `0`, or (as a divisor) blow the expression up — so it rarely
  helps you climb to 10.
- **All-equal digits split oddly.** `0000`, `1111`, `4444`, `6666`, `7777`
  are impossible, yet `2222` (`2×2×2+2`), `3333` (`3×3+3÷3`), `5555`
  (`5+5+5−5`), `8888` (`8+(8+8)÷8`) and `9999` (`(9×9+9)÷9`) all work — so
  "four of a kind" is no guarantee either way.
- **The rare "no-zero, all-distinct" impossibles are few.** With four
  different nonzero digits, almost everything works; `2257` is the only
  impossible set with no `0` and no triple, and even it has a repeated `2`.

---

## Example solutions

| Digits | One way to make 10 |
|---|---|
| `2 3 4 5` | `(3 + 4 − 2) + 5` |
| `5 5 5 5` | `5 + 5 + 5 − 5` |
| `0 0 5 5` | `5 + 0 + 0 + 5` |
| `3 7 8 2` | `2 ÷ 3 × (7 + 8)` |
| `1 2 3 4` | `1 + 2 + 3 + 4` |

---

## Running the solver

```bash
# Solve a single hand (prints an expression, or IMPOSSIBLE)
python3 make10.py 3 7 8 2

# Reproduce the aggregate counts
python3 make10.py --stats

# Print the full list of impossible digit-sets
python3 make10.py --impossible
```

No third-party dependencies — just Python 3's standard library.
