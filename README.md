# Ngrok
## Traffic Policy Demo

Checkout the [ngrok ingress controller](https://github.com/ngrok/kubernetes-ingress-controller).

### Setup

- **Claim Domain**: You'll need a static domain to apply this example. You can claim a free static domain from ngrok on a free account.
  - `export NGROK_DOMAIN="your-domain-here"`
- **Helm Add ngrok Controller**: 
 
  ```bash
  helm repo add ngrok https://ngrok.github.io/kubernetes-ingress-controller
  ```
- **ENV**: Ensure you've exported envars for `NGROK_API_KEY` and `NGROK_AUTHTOKEN`.
- **Helm Install**:

  ```bash
  helm install ngrok-ingress-controller ngrok/kubernetes-ingress-controller \
    --namespace ngrok-ingress-controller \
    --create-namespace \
    --set credentials.apiKey=$NGROK_API_KEY \
    --set credentials.authtoken=$NGROK_AUTHTOKEN
  ```

- **Verify**: Check your controller is running: `kubectl get pods -n ngrok-ingress-controller`

### Getting Started


```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: game-2048
spec:
  ports:
    - name: http
      port: 80
      targetPort: 3000
  selector:
    app: game-2048
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: game-2048
spec:
  replicas: 1
  selector:
    matchLabels:
      app: game-2048
  template:
    metadata:
      labels:
        app: game-2048
    spec:
      containers:
        - name: backend
          image: deloperator/2048-demo:latest
          ports:
            - name: http
              containerPort: 3000
EOF
```

Assuming you've setup an ngrok static domain and exported, `export NGROK_DOMAIN="your-domain-here"`, you can start your ingress.

```bash
kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: game-2048
spec:
  ingressClassName: ngrok
  rules:
    - host: $NGROK_DOMAIN
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: game-2048
                port:
                  number: 80
EOF
```

### Original 2048

Derived from [Original 2048](https://github.com/gabrielecirulli/2048)

### Resources

- [Introducing ngrok's Traffic Policy module](https://ngrok.com/blog-post/traffic-policy-engine#introducing-ngroks-traffic-policy-module)
- [HTTP Traffic Policy docs](https://ngrok.com/docs/http/traffic-policy/expressions/)
- [Secure APIs, AI and Policies](https://ngrok.com/blog-post/tutorial-jwt-api-gateway)
- [Building Secure AI Bridges](https://ngrok.com/blog-post/ai-meets-ngrok-privacy-customer-data)
- [ngrok-javascript](https://github.com/ngrok/ngrok-javascript)
  - [ngrok-js examples with fastify, nextjs, remix, express, and beyond](https://github.com/ngrok/ngrok-javascript/tree/main/examples)
- [ngrok-python](https://github.com/ngrok/ngrok-python)
  - [ngrok-py examples with django, flask, uvicorn, gradio, and beyond](https://github.com/ngrok/ngrok-python/tree/main/examples)
- [ngrok mTLS](https://ngrok.com/docs/http/mutual-tls/?cty=javascript-sdk)
- [load balancing with Cloud Edges](https://ngrok.com/docs/guides/load-balancing-with-cloud-edges/)
- [Weighted Round-Robin Load Balancing](https://ngrok.com/docs/guides/how-to-do-weighted-load-balancing-with-ngrok-cloud-edges/)