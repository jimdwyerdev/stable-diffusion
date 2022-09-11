import sys
import json
import os
import subprocess


# import pdb; pdb.set_trace()

def main():
    payload = json.loads(sys.argv[1])
    print(payload)

    # prompt = sys.argv[1]

    prompt = payload['prompt']
    file_path = os.path.normpath(os.path.dirname(__file__) + "/../logs/test.txt")
    f = open(file_path, "w")
    f.write(f"{prompt}")
    f.close()

    dream_path = os.path.normpath(os.path.dirname(__file__) + "/../../scripts/dream.py")
    print('dream_path' + dream_path)
    logfile = open(os.path.normpath(os.path.dirname(__file__) + "/../logs/log.txt"), "w")
    
    proc = subprocess.Popen([f"python", "{dream_path} --from-file {file_path}"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
    for line in proc.stdout:
        sys.stdout.write(line)
        logfile.write(line)
    proc.wait()

    # os.system(f"../../scripts/dream.py --from-file {file_path}")


    # logfile = open('logfile', 'w')
    # proc=subprocess.Popen(['cat', 'file'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    # for line in proc.stdout:
    #     sys.stdout.write(line)
    #     logfile.write(line)
    # proc.wait()

    sys.stdout.flush()

main()