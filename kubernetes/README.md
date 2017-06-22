# Kubernetes setup

## Installation

* Install minikube (https://github.com/kubernetes/minikube)
* Install kubectl
* Setup cluster

`minikube start --disk-size="70g"`
`minikube status`
`kubectl cluster-info`
`kubectl get pods --namespace=kube-system`

`minikube addons list`
`kubectl get pods --namespace=kube-system`



## Dashboard

`minikube dashboard`

## Run pact broker


`kubectl create -f kubernetes/postgres-deployment.yaml`
`kubectl create -f kubernetes/pact-deployment.yaml`

## Verify services, pods, deployments

###  Get commands with basic output
$ kubectl get services                          # List all services in the namespace
$ kubectl get pods --all-namespaces             # List all pods in all namespaces
$ kubectl get pods -o wide                      # List all pods in the namespace, with more details

Get URI for pact
`minikube service pact --url`

Access it in the browser

### Resources

https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/#accessing-the-service
