#!/bin/python3
from math import pow
from math import sin
import random

vals = []
scores = []

with open("mockdata.csv", "w") as outfile:
    outfile.write("")

for day in range(0,7):
    sleep = random.randint(3,12)
    for y in range(0, 3135):
        x = y/1000
        prob = -.0001*pow(x,8) + .02*pow(x,5) - .2*pow(x,5) - .2*pow(x,3) + .2*pow(x,4) - .005*pow(x,6) + .001*pow(x,7) + .1
        prob = pow(sin(prob),2)
        x /= 3.135
        vals.append((x*17+7, prob))

    for val in vals:
        x = val[0]
        rand = random.random()
        hours = str(int(x)).zfill(2)
        mins = str(int(x*60 - int(x)*60)).zfill(2)
        time = "{0}{1}".format(hours,mins)
        if rand < val[1]:
            scores.append((day/6,int(time)/2400,sleep/12,1))
        else:
            scores.append((day/6,int(time)/2400,sleep/12,0))

with open("mockdata.csv", "a") as outfile:
    for score in scores:
        outfile.write("{0}\t{1}\t{2}\t{3}\n".format(score[0],score[1],score[2],score[3]))