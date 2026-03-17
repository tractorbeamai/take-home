#!/usr/bin/env bash
# Removes a per-candidate IAM user and all associated resources.
# Usage: ./candidate-teardown.sh <candidate-name>
# Requires: AWS_PROFILE=sandbox

set -euo pipefail

CANDIDATE="${1:?Usage: $0 <candidate-name>}"
USER_NAME="hiring-candidate-${CANDIDATE}"

export AWS_PROFILE=sandbox

echo "Cleaning up IAM user: ${USER_NAME}"

for key_id in $(aws iam list-access-keys --user-name "${USER_NAME}" --query 'AccessKeyMetadata[].AccessKeyId' --output text); do
  echo "Deleting access key: ${key_id}"
  aws iam delete-access-key --user-name "${USER_NAME}" --access-key-id "${key_id}"
done

echo "Deleting inline policy"
aws iam delete-user-policy --user-name "${USER_NAME}" --policy-name "BedrockInvokeOnly" 2>/dev/null || true

echo "Deleting user"
aws iam delete-user --user-name "${USER_NAME}"

echo "Done. User ${USER_NAME} removed."
