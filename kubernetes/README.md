# Kubernetes setup

## Installation

* Install minikube (https://github.com/kubernetes/minikube)
* Install kubectl
* Setup cluster


## Dashboard

minikube dashboard

## Run pact broker

kubectl create -f ./kubernetes

## Verify services, pods, deployments

###  Get commands with basic output
$ kubectl get services                          # List all services in the namespace
$ kubectl get pods --all-namespaces             # List all pods in all namespaces
$ kubectl get pods -o wide                      # List all pods in the namespace, with more details

$ kubectl logs -f postgres-432495280-2ghwf
