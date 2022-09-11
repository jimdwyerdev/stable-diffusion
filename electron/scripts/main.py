import sys
import json
import os

# import pdb; pdb.set_trace()

def main():
    payload = json.loads(sys.argv[1])
    print(payload)

    os.system("script2.py 1")

    sys.stdout.flush()

main()