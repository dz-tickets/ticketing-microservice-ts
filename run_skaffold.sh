#!/bin/bash
#
# Skaffold Development Environment Launcher
#
# This script launches Skaffold in different environments with configurable settings.
# Usage: ./script.sh [environment_type] [additional_args]
#   environment_type: local (default) or gcb
#   additional_args: any additional arguments to pass to skaffold

set -e  # Exit on error

# Load environment variables from .env file if present
load_env_file() {
  if [ -f .env ]; then
    echo "Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
  fi
}

# Run skaffold with the specified profile and arguments
run_skaffold() {
  local profile="$1"
  local additional_args="$2"
  local repo=""

  case "${profile}" in
    "local")
      echo "Starting skaffold in LOCAL environment..."
      repo="${LOCAL_DEFAULT_REPO}"
      ;;
    "gcb")
      echo "Starting skaffold in GCB environment..."
      repo="${GOOGLE_CLOUD_DEFAULT_REPO}"
      ;;
    *)
      echo "ERROR: Invalid environment type: ${profile}"
      echo "Valid options are: local, gcb"
      return 1
      ;;
  esac

  if [[ -z "${repo}" ]]; then
    echo "ERROR: Repository is empty or not set for ${profile} environment"
    return 1
  fi

  echo "Using repository: ${repo}"
  local cmd="skaffold dev -p ${profile} --default-repo=${repo}"

  if [[ -n "${additional_args}" ]]; then
    cmd="${cmd} ${additional_args}"
  fi

  echo "Executing: ${cmd}"
  eval "${cmd}"
}

# Main script execution
main() {
  load_env_file

  # Process script arguments
  local env_type="${1:-local}"
  shift 1 || true
  local additional_args="$@"

  echo "Environment Type: ${env_type}"
  if [[ -n "${additional_args}" ]]; then
    echo "Additional Arguments: ${additional_args}"
  fi

  run_skaffold "${env_type}" "${additional_args}"
}

main "$@"