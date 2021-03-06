# Kubernetes setup

## Installation

-   Install minikube (https://github.com/kubernetes/minikube)
-   Install kubectl
-   Setup cluster
-   enable bash completion for kubectl https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion

```
minikube start --disk-size="10g --memory="4096"

minikube status

kubectl cluster-info
```

## Dashboard

`minikube dashboard`

## Run pact broker

```
kubectl apply -f kubernetes/postgres-deployment.yaml --record

kubectl apply -f kubernetes/pact-deployment.yaml --record
```

## Verify services, pods, deployments

### Get commands with basic output

```
$ kubectl get services                          # List all services in the namespace
$ kubectl get pods --all-namespaces             # List all pods in all namespaces
$ kubectl get pods -o wide                      # List all pods in the namespace, with more details
```

Get URI for pact

`minikube service pact --url`

Access it in the browser

-   username: shanelee007
-   password: password123

## Linkerd (service mesh)

```
linkerd inject pact-deployment.yaml \
  | kubectl apply -f -
```

### Explore linkerd

`linkerd dashboard`

This command retrieves all of the deployments running in the default namespace, runs the set of Kubernetes resources through inject, and finally reapplies it to the cluster.

### Resources

https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/#accessing-the-service

https://linkerd.io/2/adding-your-service/index.html
