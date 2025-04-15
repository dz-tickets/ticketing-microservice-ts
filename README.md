# Ticketing app
## Cluster configuration:

An ingress controller 'ingress-nginx' is used. For configuration details, please visit:
https://kubernetes.github.io/ingress-nginx/deploy/#quick-start

### Local deployment
Remember to add the host from `./infra/k8s/ingress-srv.yml` to your local machine's `hosts` file to redirect the host to LoadBalancer port.
* 127.0.0.1 - in case of a local deployment
* LoadBalanced IP - in case of Google Cloud Deployment

## Deployment Scripts

### Using run_skaffold Scripts

The project includes both shell script and batch files for running Skaffold deployments in different environments.

#### For Linux/macOS (run_skaffold.sh):

```bash
# For local deployment (default)
./run_skaffold.sh

# For Google Cloud Build deployment
./run_skaffold.sh gcb

# With additional arguments
./run_skaffold.sh local --your-additional-args
```

#### For Windows (run_skaffold.bat):

```batch
# For local deployment (default)
run_skaffold.bat

# For Google Cloud Build deployment
run_skaffold.bat gcb

# With additional arguments
run_skaffold.bat local --your-additional-args
```

### Environment Variables

Both scripts require the following environment variables to be set:

- `LOCAL_DEFAUL_REPO`: Your Docker repository for local development
- `GOOGLE_CLOUD_DEFAUL_REPO`: Your Google Cloud repository path (typically in the format `gcr.io/[project-id]`)

#### Setting Environment Variables with .env File

The simplest way to set the required environment variables is by using the provided `.env` file in the project root:

1. Copy the example `.env` file or create a new one:
   ```
   LOCAL_DEFAUL_REPO=docker.io/yourusername
   GOOGLE_CLOUD_DEFAUL_REPO=gcr.io/your-project-id
   ```

2. Replace the placeholder values with your actual Docker username and Google Cloud project ID.

3. The scripts will automatically load these environment variables from the `.env` file when executed.

#### Manual Setting (Alternative)

If you prefer to set the variables manually:

```bash
# Linux/macOS
export LOCAL_DEFAUL_REPO="docker.io/yourusername"
export GOOGLE_CLOUD_DEFAUL_REPO="gcr.io/your-project-id"
./run_skaffold.sh

# Windows
set LOCAL_DEFAUL_REPO=docker.io/yourusername
set GOOGLE_CLOUD_DEFAUL_REPO=gcr.io/your-project-id
run_skaffold.bat
```

If these variables are not set either through the `.env` file or manually, the scripts will display an error message.
