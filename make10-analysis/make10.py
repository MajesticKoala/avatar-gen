#!/usr/bin/env python3
"""
Make 10 — four-digit puzzle solver and analyzer.

Game rules (as configured here):
  * You are given four digits, each 0-9.
  * You may REORDER the digits freely.
  * Insert one of + - * / between each adjacent pair.
  * PARENTHESES (any grouping) are allowed.
  * Every digit is used exactly once. No digit-gluing (1 and 0 != "10").
  * Real division is allowed (fractions may appear in intermediate steps).
  * Goal: reach exactly 10.

Usage:
  python3 make10.py 2 3 4 5      # solve one set, print an expression
  python3 make10.py --stats      # aggregate counts over all inputs
  python3 make10.py --impossible # list every impossible digit-set
"""
import sys
from fractions import Fraction
from itertools import product, permutations, combinations_with_replacement

OPS = ['+', '-', '*', '/']
TARGET = Fraction(10)


def apply(a, b, op):
    if op == '+':
        return a + b
    if op == '-':
        return a - b
    if op == '*':
        return a * b
    if op == '/':
        return None if b == 0 else a / b


# The 5 parenthesizations of four operands (Catalan number C_3 = 5).
# Each returns (value, rendered_string) or None on divide-by-zero.
def shapes(nums, ops):
    a, b, c, d = nums
    o1, o2, o3 = ops
    out = []

    A = (a, _fmt(a)); B = (b, _fmt(b)); C = (c, _fmt(c)); D = (d, _fmt(d))

    # 1: ((a o1 b) o2 c) o3 d
    v = apply(a, b, o1)
    if v is not None:
        v2 = apply(v, c, o2)
        if v2 is not None:
            v3 = apply(v2, d, o3)
            if v3 is not None:
                out.append((v3, f"(({A[1]} {o1} {B[1]}) {o2} {C[1]}) {o3} {D[1]}"))
    # 2: (a o1 (b o2 c)) o3 d
    v = apply(b, c, o2)
    if v is not None:
        v2 = apply(a, v, o1)
        if v2 is not None:
            v3 = apply(v2, d, o3)
            if v3 is not None:
                out.append((v3, f"({A[1]} {o1} ({B[1]} {o2} {C[1]})) {o3} {D[1]}"))
    # 3: (a o1 b) o2 (c o3 d)
    l = apply(a, b, o1); r = apply(c, d, o3)
    if l is not None and r is not None:
        v = apply(l, r, o2)
        if v is not None:
            out.append((v, f"({A[1]} {o1} {B[1]}) {o2} ({C[1]} {o3} {D[1]})"))
    # 4: a o1 ((b o2 c) o3 d)
    v = apply(b, c, o2)
    if v is not None:
        v2 = apply(v, d, o3)
        if v2 is not None:
            v3 = apply(a, v2, o1)
            if v3 is not None:
                out.append((v3, f"{A[1]} {o1} (({B[1]} {o2} {C[1]}) {o3} {D[1]})"))
    # 5: a o1 (b o2 (c o3 d))
    v = apply(c, d, o3)
    if v is not None:
        v2 = apply(b, v, o2)
        if v2 is not None:
            v3 = apply(a, v2, o1)
            if v3 is not None:
                out.append((v3, f"{A[1]} {o1} ({B[1]} {o2} ({C[1]} {o3} {D[1]}))"))
    return out


def _fmt(fr):
    return str(fr.numerator)


def solve(digits):
    """Return a solution string reaching 10, or None if impossible."""
    for perm in set(permutations(digits)):
        nums = [Fraction(x) for x in perm]
        for ops in product(OPS, repeat=3):
            for val, expr in shapes(nums, ops):
                if val == TARGET:
                    return expr
    return None


def is_solvable(digits):
    return solve(digits) is not None


def stats():
    # Ordered strings 0000-9999
    total = solvable = 0
    for seq in product(range(10), repeat=4):
        total += 1
        if is_solvable(seq):
            solvable += 1
    print("Ordered four-digit strings (0000-9999):")
    print(f"  total     : {total}")
    print(f"  solvable  : {solvable}")
    print(f"  impossible: {total - solvable}")
    print(f"  %solvable : {100*solvable/total:.2f}%\n")

    # Unordered digit-sets C(13,4)
    mtotal = msolv = 0
    impossible = []
    for combo in combinations_with_replacement(range(10), 4):
        mtotal += 1
        if is_solvable(combo):
            msolv += 1
        else:
            impossible.append(combo)
    print("Unordered digit-sets (order ignored, = C(13,4)):")
    print(f"  total     : {mtotal}")
    print(f"  solvable  : {msolv}")
    print(f"  impossible: {mtotal - msolv}")
    return impossible


def list_impossible():
    impossible = [c for c in combinations_with_replacement(range(10), 4)
                  if not is_solvable(c)]
    print(f"{len(impossible)} impossible digit-sets:")
    for c in impossible:
        print("".join(map(str, c)))


def main(argv):
    if len(argv) == 0 or argv[0] in ('-h', '--help'):
        print(__doc__)
        return
    if argv[0] == '--stats':
        stats()
        return
    if argv[0] == '--impossible':
        list_impossible()
        return
    digits = [int(x) for x in argv]
    if len(digits) != 4 or any(d < 0 or d > 9 for d in digits):
        print("Provide exactly four digits 0-9.")
        return
    sol = solve(digits)
    if sol:
        print(f"{digits} -> {sol} = 10")
    else:
        print(f"{digits} -> IMPOSSIBLE")


if __name__ == '__main__':
    main(sys.argv[1:])
