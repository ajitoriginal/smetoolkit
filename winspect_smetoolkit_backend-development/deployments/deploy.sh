#!/bin/bash
aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 699630347910.dkr.ecr.us-east-1.amazonaws.com

sudo aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 699630347910.dkr.ecr.us-east-1.amazonaws.com/winspect-sme-toolkit-dev

docker pull 699630347910.dkr.ecr.us-east-1.amazonaws.com/winspect-sme-toolkit-dev:latest
